import { IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  surname: string;

  @IsString()
  name: string;

  @IsString()
  patronymic: string;

  @IsString()
  post: string;

  @IsString()
  study: string;
}
