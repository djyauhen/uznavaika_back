import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class TypeClassDto {
  @IsString()
  @IsNotEmpty()
  class_name: string;

  @IsNumber()
  amount: number;
}

export class CreateSubcategoryDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  category_id: string;

  @IsString()
  age: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TypeClassDto)
  types_class: TypeClassDto[];

  @IsOptional()
  @IsNumber()
  subscription_amount?: number;
}
