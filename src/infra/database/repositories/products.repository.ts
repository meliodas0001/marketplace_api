import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProductsEntity } from '@database/entities/products.entity';
import { IProductsRepository } from '@domains/repositories/IProductsRepository';
import { ICreateProduct } from '@domains/dtos/products/ICreateProducts';
import { IUpdateProduct } from '@domains/dtos/products/IUpdateProduct';
import { updateCategories } from './utils/updateCategories';

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

  async update(product: IUpdateProduct): Promise<ProductsEntity> {
    const { productId, name, description, categories } = product;

    const productFind = await this.productsEntity.findOne({
      relations: ['categories'],
      where: {
        id: productId,
      },
    });

    productFind.categories = updateCategories(
      productFind.categories,
      categories,
    );

    const updatedProduct = { ...productFind, name, description };
    await this.productsEntity.save(updatedProduct);

    return { ...product, ...updatedProduct };
  }

  async findProductByName(name: string): Promise<ProductsEntity> {
    return await this.productsEntity.findOne({
      where: {
        name,
      },
    });
  }

  async findProductById(id: string): Promise<ProductsEntity> {
    return await this.productsEntity.findOne({
      where: {
        id,
      },
    });
  }

  async findAllStoreProducts(
    storeId: string,
    page: number,
    pageSize: number,
  ): Promise<{ items: ProductsEntity[]; total: number }> {
    const [items, total] = await this.productsEntity.findAndCount({
      relations: ['productsPrice'],
      where: {
        categories: {
          storeId,
        },
        productsPrice: {
          products: {
            categories: {
              storeId,
            },
          },
        },
      },

      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, total };
  }

  async findProductByCategory(
    category: string,
    storeId: string,
    page: number,
    pageSize: number,
  ): Promise<{ items: ProductsEntity[]; total: number }> {
    const [items, total] = await this.productsEntity.findAndCount({
      relations: ['productsPrice'],
      where: {
        categories: {
          name: category,
          storeId,
        },
        productsPrice: {
          products: {
            categories: {
              name: category,
              storeId,
            },
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, total };
  }

  async deleteByProductId(id: string): Promise<void> {
    await this.productsEntity.delete({
      id,
    });
  }
}
