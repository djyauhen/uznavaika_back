import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registration')
  registerUser(@Body() dto: CreateUsersDto) {
    return this.usersService.registerUser(dto);
  }
}
