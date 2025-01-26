import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'admin' })
export class Users extends Document {
  @Prop({ required: true, unique: true })
  login: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: null })
  refreshToken: string | null;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
