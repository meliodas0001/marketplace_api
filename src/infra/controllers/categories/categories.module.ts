import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CreateCategoryUseCase } from '@useCases/categories/CreateCategory.useCase';

@Module({
  controllers: [CategoriesController],
  providers: [CreateCategoryUseCase],
  imports: [DatabaseModule],
})
export class CategoriesModule {}
