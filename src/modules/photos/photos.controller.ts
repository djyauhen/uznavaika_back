import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/photos', // Папка для сохранения файлов
        filename: (req, file, callback) => {
          // Генерация уникального имени файла
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('additionalData') additionalData: string,
  ) {
    // Сохранение пути файла в базу данных
    const filePath = `uploads/photos/${file.filename}`;
    return await this.photosService.saveFileData(filePath, additionalData);
  }

  @Get()
  async getAll() {
    return this.photosService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.photosService.getOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOne(@Param('id') id: string) {
    return this.photosService.delete(id);
  }
}
