import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentFiles, DocumentFilesSchema } from './schemas/document.schema';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentFiles.name,
        schema: DocumentFilesSchema,
      },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, JwtAuthGuard],
})
export class DocumentsModule {}
