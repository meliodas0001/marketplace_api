import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsPriceEntity } from '@database/entities/productsPrice.entity';
import { IProductsPriceRepository } from '@domains/repositories/IProductsPriceRepository';
import { ICreateProductsPrice } from '@domains/dtos/productsPrice/ICreateProductsPrice';
import { IUpdateProductsPrice } from '@domains/dtos/productsPrice/IUpdateProductsPrice';

@Injectable()
export class ProductsPriceRepository implements IProductsPriceRepository {
  constructor(
    @InjectRepository(ProductsPriceEntity)
    private productsPriceEntity: Repository<ProductsPriceEntity>,
  ) {}

  async create(
    productsPrice: ICreateProductsPrice,
  ): Promise<ProductsPriceEntity> {
    const { currency, price, products } = productsPrice;
    const productsPriceCreated = this.productsPriceEntity.create({
      currency,
      amount: price,
      products: products,
    });

    await this.productsPriceEntity.save(productsPriceCreated);
    productsPriceCreated.products = productsPrice.products;

    return productsPriceCreated;
  }

  async update(
    productsPrice: IUpdateProductsPrice,
  ): Promise<ProductsPriceEntity> {
    const findProductPrice = await this.productsPriceEntity.findOne({
      where: {
        products: {
          id: productsPrice.id,
        },
      },
    });

    const { id, ...updateProductsPrice } = productsPrice;

    const updatedProductPrice = {
      ...findProductPrice,
      ...updateProductsPrice,
    };

    await this.productsPriceEntity.save(updatedProductPrice);
    return updatedProductPrice;
  }

  async delete(id: string): Promise<void> {
    await this.productsPriceEntity.delete(id);
  }
}
