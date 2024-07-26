import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProductsEntity } from '@database/entities/products.entity';
import { IProductsRepository } from '@domains/repositories/IProductsRepository';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsEntity: Repository<ProductsEntity>,
  ) {}
}
