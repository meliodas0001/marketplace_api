import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CategoriesEntity } from '@database/entities/categories.entity';

import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';
import { IUpdateCategory } from '@domains/dtos/categories/IUpdateCategory';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private storeRepository: IStoreRepository,
  ) {}

  async execute(updateCategory: IUpdateCategory): Promise<CategoriesEntity> {
    const { name, storeId, updatedName } = updateCategory;

    const store = await this.storeRepository.findStoreById(storeId);
    if (!store) throw new NotFoundException('Store not found');

    const category = await this.categoriesRepository.findCategoryByName(
      name,
      storeId,
    );
    if (!category) throw new NotFoundException('Category not found');

    const categoryNameUpdate =
      await this.categoriesRepository.findCategoryByName(updatedName, storeId);

    if (categoryNameUpdate)
      throw new ConflictException('You already have a category with this name');

    return await this.categoriesRepository.updateCategoryName(
      name,
      updatedName,
      storeId,
    );
  }
}
