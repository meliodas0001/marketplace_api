import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ListCategoriesUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private storeRepository: IStoreRepository,
  ) {}

  async execute(storeId: string) {
    const store = await this.storeRepository.findStoreById(storeId);

    if (!store) throw new UnauthorizedException('Store not found');

    return this.categoriesRepository.listCategories(storeId);
  }
}
