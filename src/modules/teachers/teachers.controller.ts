import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './public/uploads/teachers', // Папка для сохранения файлов
        filename: (req, file, callback) => {
          // Генерация уникального имени файла
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTeacherDto: CreateTeacherDto,
  ) {
    const filePath = `uploads/teachers/${file.filename}`;
    return this.teachersService.create({ ...createTeacherDto, path: filePath });
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './public/uploads/teachers', // Папка для сохранения файлов
        filename: (req, file, callback) => {
          if (file.size !== 0) {
            // Генерация уникального имени файла
            const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, uniqueSuffix);
          }
        },
      }),
    }),
  )
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    if (file && file.size !== 0) {
      updateTeacherDto.path = `uploads/teachers/${file.filename}`;
    }
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
