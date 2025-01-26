import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ collection: 'subcategory' })
export class Subcategory extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category_id: string;

  @Prop({ required: true })
  age: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: [
      {
        class_name: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    required: true,
  })
  types_class: {
    class_name: string;
    amount: number;
  }[];

  @Prop({ default: null })
  subscription_amount?: number;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
