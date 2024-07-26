import { Injectable, NotFoundException } from '@nestjs/common';

import { IProductsRepository } from '@domains/repositories/IProductsRepository';
import { IProductsPriceRepository } from '@domains/repositories/IProductsPriceRepository';
import { IUpdateProductDTO } from '@domains/dtos/products/IUpdateProductDTO';
import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';
import { updateProductMapper } from '@mappers/updateProductMapper';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private productRepository: IProductsRepository,
    private productsPriceRepository: IProductsPriceRepository,
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(productUpdate: IUpdateProductDTO) {
    const productFind = await this.productRepository.findProductById(
      productUpdate.id,
    );

    const { productPrice, categoriesIds, ...productsWithoutProductPrice } =
      productUpdate;

    if (!productFind) throw new NotFoundException('Product not found');

    const findCategories = await this.categoriesRepository.findCategoriesByIds(
      productUpdate.categoriesIds,
    );

    if (!findCategories && productUpdate.categoriesIds.length > 0)
      throw new NotFoundException('Category not found');

    const updateProduct = await this.productRepository.update({
      ...productsWithoutProductPrice,
      categories: findCategories,
    });

    const updatePrice = await this.productsPriceRepository.update({
      ...productPrice,
      id: productUpdate.id,
    });

    return updateProductMapper({ ...updateProduct, ...updatePrice });
  }
}
