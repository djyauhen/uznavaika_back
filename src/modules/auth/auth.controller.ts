import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from "express";
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      body.login,
      body.password,
    );

    // Устанавливаем refresh токен в HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Только для HTTPS
      sameSite: 'strict',
    });

    return { accessToken }; // Возвращаем access токен в ответе
  }

  @Post('refresh')
  async refresh(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    const tokens = await this.authService.refreshTokens(refreshToken);

    const accessToken = tokens.accessToken;
    const newRefreshToken = tokens.refreshToken;

    // Обновляем refresh токен в cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { accessToken };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200) // Устанавливаем код ответа на 200
  async logout(@Req() req: any) {
    const userId = req.user.userId; // ID пользователя из токена
    if (userId) {
      await this.authService.logout(userId);
      return { statusCode: 200, message: 'Выход успешен' };
    }
    throw { statusCode: 500, message: 'Ошибка выхода' };
  }
}
