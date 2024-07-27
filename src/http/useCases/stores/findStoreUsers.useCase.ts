import { IUsersStore } from '@domains/dtos/store/IUsersStore';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class FindStoreUsersUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(storeId: string): Promise<IUsersStore[]> {
    const store = await this.storeRepository.findStoreUsers(storeId);

    if (!store) throw new NotFoundException('Store not found');

    return store;
  }
}
