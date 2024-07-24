import { StoreEntity } from '@database/entities/store.entity';
import { UserEntity } from '@database/entities/user.entity';
import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';

export abstract class IStoreRepository {
  abstract create(
    store: IStoreCreateDTO,
    user: UserEntity,
  ): Promise<StoreEntity>;
  abstract findStoreById(id: string): Promise<StoreEntity>;
  abstract findStoreByOwnerId(ownerId: string): Promise<StoreEntity[]>;
  abstract findStoreUsers(storeId: string): Promise<any[]>;
  abstract findStoresByUserId(userId: string): Promise<StoreEntity[]>;
}
