import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Photos extends Document {
  @Prop({ required: true })
  path: string;

  @Prop()
  additionalData: string;
}

export const PhotosSchema = SchemaFactory.createForClass(Photos);
