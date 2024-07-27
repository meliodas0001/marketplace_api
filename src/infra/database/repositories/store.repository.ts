import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { StoreEntity } from '@database/entities/store.entity';
import { UserEntity } from '@database/entities/user.entity';

import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';
import { IStoreUpdate } from '@domains/dtos/store/IStoreUpdate';

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

  async updateStore(store: IStoreUpdate): Promise<void> {
    const findStore = await this.storeEntity.findOne({
      where: {
        id: store.storeId,
      },
    });

    const { storeId, ...storeWithoutStoreId } = store;
    Object.assign(findStore, storeWithoutStoreId);

    await this.storeEntity.save(findStore);
  }

  async deleteStore(storeId: string): Promise<void> {
    await this.storeEntity.delete({
      id: storeId,
    });
  }

  async deleteUserFromStore(storeId: string, userId: string): Promise<void> {
    const store = await this.storeEntity.findOne({
      where: {
        id: storeId,
      },
      relations: ['users'],
    });

    store.users = store.users.filter((user) => user.id !== userId);

    await this.storeEntity.save(store);
  }

  async findUserByStore(
    storeId: string,
    userId: string,
  ): Promise<UserEntity | null> {
    const store = await this.storeEntity.findOne({
      where: { id: storeId },
      relations: ['users'],
    });

    if (store) {
      const user = store.users.find((user) => user.id === userId);
      return user || null;
    }

    return null;
  }

  async findStoreByName(store_name: string): Promise<StoreEntity> {
    return await this.storeEntity.findOne({
      where: {
        store_name,
      },
    });
  }
}
