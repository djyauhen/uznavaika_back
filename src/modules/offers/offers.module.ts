import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from './schemas/offer.schema';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { OffersRepository } from './offers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema,
      },
    ]),
  ],
  controllers: [OffersController],
  providers: [OffersService, JwtAuthGuard, OffersRepository],
  exports: [OffersRepository],
})
export class OffersModule {}
