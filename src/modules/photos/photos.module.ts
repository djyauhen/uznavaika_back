import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { Photos, PhotosSchema } from './schemas/photos.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photos.name, schema: PhotosSchema }]),
  ],
  controllers: [PhotosController],
  providers: [PhotosService, JwtAuthGuard],
})
export class PhotosModule {}
