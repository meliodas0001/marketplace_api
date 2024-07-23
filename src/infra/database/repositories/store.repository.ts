import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { StoreEntity } from '@database/entities/store.entity';

import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';
import { UserEntity } from '@database/entities/user.entity';
import { IUsersStore } from '@domains/dtos/store/IUsersStore';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectRepository(StoreEntity) private storeEntity: Repository<StoreEntity>,
  ) {}
  async create(store: IStoreCreateDTO, user: UserEntity): Promise<StoreEntity> {
    const storeCreated = this.storeEntity.create(store);

    storeCreated.ownerId = user.id;
    storeCreated.users = [user];

    await this.storeEntity.save(storeCreated);

    return storeCreated;
  }

  async findStoreById(id: string): Promise<StoreEntity> {
    return await this.storeEntity.findOne({
      where: {
        id,
      },
    });
  }

  async findStoreByOwnerId(ownerId: string): Promise<StoreEntity[]> {
    return await this.storeEntity.find({
      where: {
        ownerId,
      },
    });
  }

  async findStoreUsers(storeId: string): Promise<any[]> {
    return await this.storeEntity.find({
      relations: ['users'],
      where: {
        id: storeId,
      },
      select: {
        store_name: false,
        address: false,
        description: false,
        id: false,

        ownerId: true,
        users: true,
      },
    });
  }
}
