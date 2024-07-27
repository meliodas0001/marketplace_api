import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IStoreUpdate } from '@domains/dtos/store/IStoreUpdate';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(store: IStoreUpdate): Promise<void> {
    const storeFind = await this.storeRepository.findStoreById(store.storeId);

    if (!storeFind) throw new NotFoundException('Store not found');

    if (store.store_name) {
      const tryFindStore = await this.storeRepository.findStoreByName(
        store.store_name,
      );

      if (tryFindStore) throw new ConflictException('Store already exists');
    }

    await this.storeRepository.updateStore(store);
  }
}
