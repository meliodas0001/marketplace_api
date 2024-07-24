import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IStoreUpdate } from '@domains/dtos/store/IStoreUpdate';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(store: IStoreUpdate): Promise<void> {
    const storeFind = await this.storeRepository.findStoreById(store.storeId);

    if (!storeFind) throw new UnauthorizedException('Store not found');

    await this.storeRepository.updateStore(store);
  }
}
