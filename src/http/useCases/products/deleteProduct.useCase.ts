import { IProductsPriceRepository } from '@domains/repositories/IProductsPriceRepository';
import { IProductsRepository } from '@domains/repositories/IProductsRepository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    private productRepository: IProductsRepository,
    private productPriceRepository: IProductsPriceRepository,
  ) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productRepository.findProductById(productId);

    if (!product) throw new NotFoundException('Product not found');

    await this.productPriceRepository.deleteByProductId(productId);
    await this.productRepository.deleteByProductId(productId);
  }
}
