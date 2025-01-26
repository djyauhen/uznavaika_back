import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherPhotoDto } from './create-teacher-photo.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherPhotoDto) {}
