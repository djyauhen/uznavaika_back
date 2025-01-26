import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  title: string;

  @IsNumber()
  newPrice: number;

  @IsNumber()
  @IsOptional()
  oldPrice: number;

  @IsBoolean()
  showOffer: boolean;
}
