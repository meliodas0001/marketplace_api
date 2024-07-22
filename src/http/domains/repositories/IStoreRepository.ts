import { StoreEntity } from '@database/entities/store.entity';
import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';

export abstract class IStoreRepository {
  abstract create(store: IStoreCreateDTO): Promise<void>;
  abstract findStoreById(id: string): Promise<StoreEntity>;
}
