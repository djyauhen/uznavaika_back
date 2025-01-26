import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './schemas/teacher.schema';
import { Model } from 'mongoose';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateTeacherPhotoDto } from './dto/create-teacher-photo.dto';
import { join } from 'path';
import { unlink } from 'fs/promises';

export class TeachersRepository {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async create(createTeacherPhotoDto: CreateTeacherPhotoDto): Promise<Teacher> {
    return this.teacherModel.create(createTeacherPhotoDto);
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherModel.find();
  }

  async find(id: string): Promise<Teacher> {
    return this.teacherModel.findById(id);
  }

  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    await this.removePhoto(id);
    return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto);
  }

  async remove(id: string): Promise<Teacher> {
    await this.removePhoto(id);
    return this.teacherModel.findByIdAndDelete(id);
  }

  //Удаляем фото с диска
  async removePhoto(id: string) {
    const teacher = await this.teacherModel.findById(id).exec();

    if (!teacher) {
      throw new Error('Наставник не найден');
    }

    // Формируем полный путь к файлу

    if (teacher.path) {
      const filePath = join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        teacher.path,
      );

      try {
        // Удаляем файл с диска
        await unlink(filePath);
      } catch (e) {
        return;
      }
    }
  }
}
