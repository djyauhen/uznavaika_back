import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OffersRepository } from './offers.repository';

@Injectable()
export class OffersService {
  constructor(private readonly offersRepository: OffersRepository) {}

  create(createOfferDto: CreateOfferDto) {
    return this.offersRepository.create(createOfferDto);
  }

  findAll() {
    return this.offersRepository.findAll();
  }

  findOne(id: string) {
    return this.offersRepository.findOne(id);
  }

  update(id: string, updateOfferDto: UpdateOfferDto) {
    return this.offersRepository.update(id, updateOfferDto);
  }

  remove(id: string) {
    return this.offersRepository.remove(id);
  }
}
