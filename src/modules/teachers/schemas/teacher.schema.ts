import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'teachers' })
export class Teacher extends Document {
  @Prop({ required: true, unique: true })
  full_name: string;

  @Prop({ required: true })
  post: string;

  @Prop({ required: true })
  study: string;

  @Prop({ required: true })
  path: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
