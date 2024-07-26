import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsPriceEntity } from '@database/entities/productsPrice.entity';
import { IProductsPriceRepository } from '@domains/repositories/IProductsPriceRepository';

@Injectable()
export class ProductsPriceRepository implements IProductsPriceRepository {
  constructor(
    @InjectRepository(ProductsPriceEntity)
    private productsPriceEntity: Repository<ProductsPriceEntity>,
  ) {}

  async create(productsPrice: ICreateProductsPrice): Promise<void> {
    const productsPriceCreated = this.productsPriceEntity.create(productsPrice);

    await this.productsPriceEntity.save(productsPriceCreated);
  }
  async update(productsPrice: ICreateProductsPrice): Promise<void> {
    const productsPriceFind = await this.productsPriceEntity.findOne({
      where: {
        products: {
          id: productsPrice.productId,
        },
      },
    });

    const updatedProductsPrice = { ...productsPriceFind, ...productsPrice };

    await this.productsPriceEntity.save(updatedProductsPrice);
  }

  async delete(id: string): Promise<void> {
    await this.productsPriceEntity.delete(id);
  }
}
