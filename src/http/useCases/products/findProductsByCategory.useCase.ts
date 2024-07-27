import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';
import { IProductsRepository } from '@domains/repositories/IProductsRepository';

@Injectable()
export class FindProductsByCategory {
  constructor(
    private productsRepository: IProductsRepository,
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(
    category: string,
    storeId: string,
    page: number,
    pageSize: number,
  ) {
    const categoryExists = await this.categoriesRepository.findCategoryByName(
      category,
      storeId,
    );

    if (!categoryExists) throw new NotFoundException('Category not found');

    return await this.productsRepository.findProductByCategory(
      category,
      storeId,
      page,
      pageSize,
    );
  }
}
