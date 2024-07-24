import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { StoreEntity } from '@database/entities/store.entity';
import { UserEntity } from '@database/entities/user.entity';

import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';

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

  async findStoresByUserId(userId: string): Promise<StoreEntity[]> {
    return await this.storeEntity
      .createQueryBuilder('store')
      .innerJoin('store.users', 'users')
      .where('users.id = :userId', { userId })
      .getMany();
  }

  async addUsersToStore(storeId: string, users: UserEntity[]): Promise<void> {
    const store = await this.storeEntity.findOne({
      where: {
        id: storeId,
      },
      relations: ['users'],
    });

    store.users = [...store.users, ...users];

    await this.storeEntity.save(store);
  }
}
