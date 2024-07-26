import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IProductsPriceRepository } from '@domains/repositories/IProductsPriceRepository';
import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';
import { IProductsRepository } from '@domains/repositories/IProductsRepository';
import { ICreateProductDTO } from '@domains/dtos/products/ICreateProducts';

import { createProductMapper } from '@mappers/createProductMapper';

@Injectable()
export class CreateProductsUseCase {
  constructor(
    private productRepository: IProductsRepository,
    private productsPriceRepository: IProductsPriceRepository,
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(product: ICreateProductDTO) {
    const { currency, name, price, description, category, storeId } = product;

    const productFind = await this.productRepository.findProductByName(name);
    if (productFind) throw new ConflictException('Product already exists');

    const findCategory = await this.categoriesRepository.findCategoryByName(
      category,
      storeId,
    );

    if (!findCategory) throw new NotFoundException('Category not found');

    const productCreated = await this.productRepository.create({
      name,
      description,
      category: findCategory,
    });

    const {
      amount,
      currency: productCurrency,
      id,
    } = await this.productsPriceRepository.create({
      currency,
      price,
      products: productCreated,
    });

    return createProductMapper({
      ...productCreated,
      price: amount,
      currency: productCurrency,
      id,
    });
  }
}
