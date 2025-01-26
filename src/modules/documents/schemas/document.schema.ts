import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'documents' })
export class DocumentFiles extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  documentHash: string;

  @Prop({ required: true })
  documentCover: string;
}

export const DocumentFilesSchema = SchemaFactory.createForClass(DocumentFiles);
