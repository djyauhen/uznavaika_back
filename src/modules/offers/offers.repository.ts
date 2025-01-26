import { InjectModel } from '@nestjs/mongoose';
import { Offer } from './schemas/offer.schema';
import { Model } from 'mongoose';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

export class OffersRepository {
  constructor(
    @InjectModel(Offer.name) private readonly offerModel: Model<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    return this.offerModel.create(createOfferDto);
  }

  async findOne(id: string) {
    return this.offerModel.findById(id);
  }

  async findAll() {
    return this.offerModel.find();
  }

  async update(id: string, updateOfferDto: UpdateOfferDto) {
    return this.offerModel.findByIdAndUpdate(id, updateOfferDto);
  }

  async remove(id: string) {
    return this.offerModel.findByIdAndDelete(id);
  }
}
