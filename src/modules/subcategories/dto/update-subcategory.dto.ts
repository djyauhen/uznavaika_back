import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcategoryDto } from './create-subcategory.dto';
import { IsString } from 'class-validator';

export class UpdateSubcategoryDto extends PartialType(CreateSubcategoryDto) {
  @IsString()
  category_id: string;
}
