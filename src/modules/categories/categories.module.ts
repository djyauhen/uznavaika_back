import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { JwtStrategy } from '../../core/guards/jwt.strategy';
import { SubcategoriesModule } from '../subcategories/subcategories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    forwardRef(() => SubcategoriesModule),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, JwtStrategy],
  exports: [CategoriesRepository, MongooseModule],
})
export class CategoriesModule {}
