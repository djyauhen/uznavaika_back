import { IsString } from 'class-validator';

export class CreateTeacherPhotoDto {
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

  @IsString()
  path: string;
}
