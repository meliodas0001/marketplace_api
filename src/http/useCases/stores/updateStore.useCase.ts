import { Injectable } from '@nestjs/common';

import { IStoreRepository } from '@domains/repositories/IStoreRepository';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private storeRepository: IStoreRepository) {}
}
