import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentFiles } from './schemas/document.schema';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(DocumentFiles.name)
    private documentFilesModel: Model<DocumentFiles>,
  ) {}

  create(
    createDocumentDto: CreateDocumentDto,
    pdfPath: string,
    coverPath: string,
  ) {
    const documentFiles = new this.documentFilesModel({
      title: createDocumentDto.title,
      documentHash: pdfPath,
      documentCover: coverPath,
    });

    return documentFiles.save();
  }

  findAll() {
    return this.documentFilesModel.find();
  }

  findOne(id: string) {
    return this.documentFilesModel.findById(id);
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
    documentHash?: string,
    documentCover?: string,
  ) {
    const documentFile = await this.documentFilesModel.findById(id).exec();

    if (documentHash) {
      const filePath = join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        documentFile.documentHash,
      );
      await unlink(filePath);
      updateDocumentDto['documentHash'] = documentHash;
    }
    if (documentCover) {
      const filePath = join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        documentFile.documentCover,
      );
      await unlink(filePath);
      updateDocumentDto['documentCover'] = documentCover;
    }

    return this.documentFilesModel.findByIdAndUpdate(id, updateDocumentDto);
  }

  async remove(id: string) {
    const documentFile = await this.documentFilesModel.findById(id).exec();

    if (!documentFile) {
      throw new Error('Файл не найден');
    }

    // Формируем полный путь к файлу
    const filePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      documentFile.documentHash,
    );
    const coverPath = join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      documentFile.documentCover,
    );

    // Удаляем файл с диска
    try {
      await unlink(filePath);
      await unlink(coverPath);
    } catch (error) {
      throw new Error(`Ошибка при удалении файла: ${error.message}`);
    }

    return this.documentFilesModel.findByIdAndDelete(id);
  }
}
