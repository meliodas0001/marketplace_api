import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';
import { StoreEntity } from '@database/entities/store.entity';
import { UserEntity } from '@database/entities/user.entity';
import { IStoreUpdate } from '@domains/dtos/store/IStoreUpdate';

export abstract class IStoreRepository {
  abstract create(
    store: IStoreCreateDTO,
    user: UserEntity,
  ): Promise<StoreEntity>;
  abstract findStoreById(id: string): Promise<StoreEntity>;
  abstract findStoreByOwnerId(ownerId: string): Promise<StoreEntity[]>;
  abstract findStoreUsers(storeId: string): Promise<any[]>;
  abstract findStoresByUserId(userId: string): Promise<StoreEntity[]>;
  abstract addUsersToStore(storeId: string, users: UserEntity[]): Promise<void>;
  abstract updateStore(store: IStoreUpdate): Promise<void>;
  abstract deleteStore(storeId: string): Promise<void>;
  abstract deleteUserFromStore(storeId: string, userId: string): Promise<void>;
  abstract findUserByStore(
    storeId: string,
    userId: string,
  ): Promise<UserEntity | null>;
}
