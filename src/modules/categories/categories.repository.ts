import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Subcategory } from '../subcategories/schemas/subcategory.schema';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
  ) {}

  async create(category: Category): Promise<Category> {
    return this.categoryModel.create(category);
  }

  async update(id: string, category: UpdateCategoryDto): Promise<Category> {
    return this.categoryModel.findOneAndUpdate({ _id: id }, category);
  }

  async delete(id: string): Promise<Category> {
    await this.subcategoryModel.deleteMany({ category_id: id });
    return this.categoryModel.findOneAndDelete({ _id: id });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findOne({ _id: id });
  }
}
