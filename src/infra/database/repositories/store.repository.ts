import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { StoreEntity } from '@database/entities/store.entity';

import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectRepository(StoreEntity) private storeEntity: Repository<StoreEntity>,
  ) {}
  async create(store: IStoreCreateDTO): Promise<void> {
    const storeCreated = this.storeEntity.create(store);

    await this.storeEntity.save(storeCreated);
  }

  async findStoreById(id: string): Promise<StoreEntity> {
    return await this.storeEntity.findOne({
      where: {
        id,
      },
    });
  }
}
