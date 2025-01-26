import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'offers' })
export class Offer extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  newPrice: number;

  @Prop({ required: false })
  oldPrice?: number;

  @Prop({ default: false })
  showOffer?: boolean;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
