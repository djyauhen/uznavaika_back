import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photos } from './schemas/photos.schema';
import { Model } from 'mongoose';
import { join } from 'path';
import { unlink } from 'fs/promises';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photos.name) private photosModel: Model<Photos>) {}

  async saveFileData(
    filePath: string,
    additionalData: string,
  ): Promise<Photos> {
    const file = new this.photosModel({
      path: filePath,
      additionalData: additionalData,
    });
    return file.save();
  }

  async getAll() {
    return this.photosModel.find();
  }

  async getOne(id: string) {
    return this.photosModel.findById(id);
  }

  async delete(id: string) {
    const photo = await this.photosModel.findById(id).exec();

    if (!photo) {
      throw new Error('Фото не найдено');
    }

    // Формируем полный путь к файлу
    const filePath = join(__dirname, '..', '..', '..', 'public', photo.path);

    // Удаляем файл с диска
    try {
      await unlink(filePath);
    } catch (error) {
      throw new Error(`Ошибка при удалении файла: ${error.message}`);
    }

    return this.photosModel.findByIdAndDelete(id);
  }
}
