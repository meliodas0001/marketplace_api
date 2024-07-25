import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private storeRepository: IStoreRepository,
  ) {}

  async execute(name: string, storeId: string) {
    const store = await this.storeRepository.findStoreById(storeId);

    if (!store) throw new UnauthorizedException('Store not found');

    const findCategory = await this.categoriesRepository.findCategoryByName(
      name,
      storeId,
    );

    if (findCategory)
      throw new UnauthorizedException('Category already exists');

    return this.categoriesRepository.create(name, storeId);
  }
}
