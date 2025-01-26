import { IsString } from 'class-validator';

export class CreateTeacherPhotoDto {
  @IsString()
  full_name: string;

  @IsString()
  post: string;

  @IsString()
  study: string;

  @IsString()
  path: string;
}
