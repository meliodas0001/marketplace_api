import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';

import { CreateCategoryUseCase } from '@useCases/categories/CreateCategory.useCase';
import { ListCategoriesUseCase } from '@useCases/categories/ListCategories.useCase';
import { UpdateCategoryUseCase } from '@useCases/categories/updateCategory.useCase';
import { DeleteCategoryUseCase } from '@useCases/categories/deleteCategory.useCase';

@Module({
  controllers: [CategoriesController],
  providers: [
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
  imports: [DatabaseModule],
})
export class CategoriesModule {}
