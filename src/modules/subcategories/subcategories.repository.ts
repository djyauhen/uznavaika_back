import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subcategory } from './schemas/subcategory.schema';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Category } from '../categories/schemas/category.schema';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesRepository {
  constructor(
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(subcategory: CreateSubcategoryDto): Promise<Subcategory> {
    const categoryExists = await this.categoryModel.findById(
      subcategory.category_id,
    );
    if (!categoryExists) {
      throw new Error('Category does not exist');
    }
    return this.subcategoryModel.create(subcategory);
  }

  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryModel.find();
  }

  async findOne(id: string): Promise<Subcategory[]> {
    return this.subcategoryModel.findById(id);
  }

  async update(
    id: string,
    updateSubcategoryDto: UpdateSubcategoryDto,
  ): Promise<Subcategory[]> {
    return this.subcategoryModel.findOneAndUpdate(
      { _id: id },
      updateSubcategoryDto,
    );
  }

  async remove(id: string): Promise<Subcategory[]> {
    return this.subcategoryModel.findOneAndDelete({ _id: id });
  }
}
