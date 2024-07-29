import { IProductsRepository } from '@domains/repositories/IProductsRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllStoreProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(storeId: string, page: number, pageSize: number) {
    const { items, total } = await this.productsRepository.findAllStoreProducts(
      storeId,
      page,
      pageSize,
    );

    return {
      products: items,
      total,
    };
  }
}
