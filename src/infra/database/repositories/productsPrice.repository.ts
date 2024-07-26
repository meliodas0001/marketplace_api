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
    });

    await this.productsPriceEntity.save(productsPriceCreated);
    productsPriceCreated.products = productsPrice.products;

    return productsPriceCreated;
  }

  async update(productsPrice: IUpdateProductsPrice): Promise<void> {
    const productsPriceFind = await this.productsPriceEntity.findOne({
      where: {
        id: productsPrice.id,
      },
    });

    const updatedProductsPrice = { ...productsPriceFind, ...productsPrice };

    await this.productsPriceEntity.save(updatedProductsPrice);
  }

  async delete(id: string): Promise<void> {
    await this.productsPriceEntity.delete(id);
  }
}
