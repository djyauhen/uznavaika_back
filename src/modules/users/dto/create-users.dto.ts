import { IsString, MinLength } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @MinLength(3)
  login: string;

  @IsString()
  @MinLength(3)
  password: string;
}
