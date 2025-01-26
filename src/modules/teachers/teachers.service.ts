import { Injectable } from '@nestjs/common';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeachersRepository } from './teachers.repository';
import { CreateTeacherPhotoDto } from './dto/create-teacher-photo.dto';

@Injectable()
export class TeachersService {
  constructor(private readonly teacherRepository: TeachersRepository) {}

  create(createTeacherPhotoDto: CreateTeacherPhotoDto) {
    return this.teacherRepository.create(createTeacherPhotoDto);
  }

  findAll() {
    return this.teacherRepository.findAll();
  }

  findOne(id: string) {
    return this.teacherRepository.find(id);
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepository.update(id, updateTeacherDto);
  }

  remove(id: string) {
    return this.teacherRepository.remove(id);
  }
}
