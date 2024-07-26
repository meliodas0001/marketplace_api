import { IProductsRepository } from '@domains/repositories/IProductsRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllStoreProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(storeId: string, page: number, pageSize: number) {
    return await this.productsRepository.findAllStoreProducts(
      storeId,
      page,
      pageSize,
    );
  }
}
