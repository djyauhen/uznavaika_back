import { Injectable } from '@nestjs/common';
import { Users } from './schemas/users.schema';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) {}

  async registerUser(dto: CreateUsersDto): Promise<any> {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      login: dto.login,
      passwordHash: passwordHash,
    });

    const createdUser = await this.usersRepository.create(user);

    return createdUser._id;
  }
}
