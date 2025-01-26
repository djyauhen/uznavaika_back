import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: CategoriesRepository,
    @InjectModel(Category.name) private categoryModel: Model<Category>,

  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new this.categoryModel({
      title: createCategoryDto.title,
    });

    return this.categoryRepository.create(newCategory);
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  async findOne(id: string) {
    return this.categoryRepository.findOne(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoryRepository.delete(id);
  }
}
