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
}
