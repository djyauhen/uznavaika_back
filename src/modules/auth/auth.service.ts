import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(userId: string) {
    const accessToken = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '24h',
      },
    );

    const refreshToken = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );

    const hashedRefreshToken = await this.hashToken(refreshToken);
    await this.userRepository.updateUser(userId, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  private async hashToken(token: string): Promise<string> {
    const bcrypt = await import('bcrypt'); // Динамический импорт bcrypt
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(token, salt);
  }

  // Проверка валидности токена
  async validateToken(token: string, secret: string) {
    try {
      return this.jwtService.verify(token, { secret });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // Обновление токенов
  async refreshTokens(refreshToken: string) {
    const payload = await this.validateToken(
      refreshToken,
      this.configService.get<string>('JWT_REFRESH_SECRET'),
    );

    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { userId } = payload;

    // Получаем пользователя из базы
    const user = await this.userRepository.findById(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException(
        'User not found or no refresh token stored',
      );
    }

    // Проверяем совпадение refreshToken
    const bcrypt = await import('bcrypt');
    const isValidToken = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isValidToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Генерируем новые токены
    const tokens = await this.generateTokens(userId);

    // Обновляем refreshToken в базе
    const hashedRefreshToken = await this.hashToken(tokens.refreshToken);
    await this.userRepository.updateUser(userId, hashedRefreshToken);

    return tokens;
  }

  // Валидация пользователя
  async validateUser(
    login: string,
    password: string,
  ): Promise<{ userId: string }> {
    const user = await this.userRepository.findByLogin(login);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { userId: user._id.toString() };
  }

  // Логин пользователя
  async login(
    login: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { userId } = await this.validateUser(login, password);

    const { accessToken, refreshToken } = await this.generateTokens(userId);
    return { accessToken, refreshToken };
  }

  async logout(userId: string): Promise<void> {
    // Например, удаляем refresh-токен из базы
    await this.userRepository.updateUser(userId, null);
  }
}
