import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProductsEntity } from '@database/entities/products.entity';
import { IProductsRepository } from '@domains/repositories/IProductsRepository';
import { ICreateProduct } from '@domains/dtos/products/ICreateProducts';
import { IUpdateProducts } from '@domains/dtos/products/IUpdateProducts';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsEntity: Repository<ProductsEntity>,
  ) {}

  async create(product: ICreateProduct): Promise<ProductsEntity> {
    const { description, name } = product;

    const productCreated = this.productsEntity.create({ description, name });
    productCreated.categories = [product.category];

    await this.productsEntity.save(productCreated);

    return productCreated;
  }
  async update(product: IUpdateProducts): Promise<ProductsEntity> {
    const { id, name, description } = product;

    const productFind = await this.productsEntity.findOne({
      where: {
        id,
      },
    });

    const updatedProduct = { ...productFind, name, description };

    await this.productsEntity.save(updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.productsEntity.delete(id);
  }

  async findProductByName(name: string): Promise<ProductsEntity> {
    return await this.productsEntity.findOne({
      where: {
        name,
      },
    });
  }
}
