import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private storeRepository: IStoreRepository,
  ) {}

  async execute(name: string, storeId: string): Promise<void> {
    const store = await this.storeRepository.findStoreById(storeId);

    if (!store) throw new UnauthorizedException('Store not found');

    const category = await this.categoriesRepository.findCategoryByName(
      name,
      storeId,
    );
    if (!category) throw new UnauthorizedException('Category not found');

    await this.categoriesRepository.deleteCategory(name, storeId);
  }
}
