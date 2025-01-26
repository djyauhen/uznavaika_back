import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'category' })
export class Category extends Document {
  @Prop({ required: true, unique: true })
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
