import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { StoreEntity } from '@database/entities/store.entity';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectRepository(StoreEntity) storeEntity: Repository<StoreEntity>,
  ) {}
  create(store: IStoreCreateDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findStoreById(id: string): Promise<StoreEntity> {
    throw new Error('Method not implemented.');
  }
}
