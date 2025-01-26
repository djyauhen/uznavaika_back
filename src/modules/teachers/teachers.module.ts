import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TeachersRepository } from './teachers.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Teacher.name,
        schema: TeacherSchema,
      },
    ]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService, TeachersRepository, JwtAuthGuard],
  exports: [TeachersRepository],
})
export class TeachersModule {}
