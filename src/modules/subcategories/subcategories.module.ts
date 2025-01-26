import { forwardRef, Module } from "@nestjs/common";
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subcategory, SubcategorySchema } from './schemas/subcategory.schema';
import { SubcategoriesRepository } from './subcategories.repository';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subcategory.name,
        schema: SubcategorySchema,
      },
    ]),
    forwardRef(() => CategoriesModule),
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService, SubcategoriesRepository, JwtAuthGuard],
  exports: [SubcategoriesRepository, MongooseModule],
})
export class SubcategoriesModule {}
