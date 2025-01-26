import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async create(user: Users): Promise<Users> {
    return await this.userModel.create(user);
  }

  async findByLogin(login: string) {
    return this.userModel.findOne({ login });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async updateUser(userId: string, refreshToken: string | null) {
    return this.userModel.findByIdAndUpdate(userId, {
      refreshToken: refreshToken,
    });
  }
}
