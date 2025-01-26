import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './public/uploads/documents',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedFields = ['file', 'cover'];
        if (allowedFields.includes(file.fieldname)) {
          return callback(null, true);
        }
        return callback(new Error('Invalid file field'), false);
      },
    }),
  )
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const pdf = files.find((file) => file.fieldname === 'file');
    const cover = files.find((file) => file.fieldname === 'cover');
    const pdfPath = `uploads/documents/${pdf.filename}`;
    const coverPath = `uploads/documents/${cover.filename}`;

    return this.documentsService.create(createDocumentDto, pdfPath, coverPath);
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './public/uploads/documents',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedFields = ['file', 'cover'];
        if (allowedFields.includes(file.fieldname)) {
          return callback(null, true);
        }
        return callback(new Error('Invalid file field'), false);
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    let documentHash: string | undefined;
    let documentCover: string | undefined;
    const pdf = files.find((file) => file.fieldname === 'file');
    const cover = files.find((file) => file.fieldname === 'cover');

    if (pdf) {
      documentHash = `uploads/documents/${pdf.filename}`;
    }

    if (cover) {
      documentCover = `uploads/documents/${cover.filename}`;
    }

    return this.documentsService.update(
      id,
      updateDocumentDto,
      documentHash,
      documentCover,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
