import { Injectable, UnauthorizedException } from '@nestjs/common';

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
    const { name, storeId } = updateCategory;

    const store = await this.storeRepository.findStoreById(storeId);
    if (!store) throw new UnauthorizedException('Store not found');

    const category = await this.categoriesRepository.findCategoryByName(
      name,
      storeId,
    );
    if (!category) throw new UnauthorizedException('Category not found');

    return await this.categoriesRepository.updateCategoryName(name, storeId);
  }
}
