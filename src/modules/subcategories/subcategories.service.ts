import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubcategoriesRepository } from './subcategories.repository';

@Injectable()
export class SubcategoriesService {
  constructor(
    private readonly subcategoriesRepository: SubcategoriesRepository,
  ) {}

  create(createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesRepository.create(createSubcategoryDto);
  }

  findAll() {
    return this.subcategoriesRepository.findAll();
  }

  findOne(id: string) {
    return this.subcategoriesRepository.findOne(id);
  }

  update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoriesRepository.update(id, updateSubcategoryDto);
  }

  remove(id: string) {
    return this.subcategoriesRepository.remove(id);
  }
}
