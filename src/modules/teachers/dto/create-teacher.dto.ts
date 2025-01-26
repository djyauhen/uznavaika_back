import { IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  full_name: string;

  @IsString()
  post: string;

  @IsString()
  study: string;
}
