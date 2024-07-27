import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class DeleteStoreUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(storeId: string, userId: string): Promise<void> {
    const store = await this.storeRepository.findStoreById(storeId);

    if (!store) throw new NotFoundException('Store not found');

    if (store.ownerId !== userId)
      throw new UnauthorizedException('User not authorized');

    await this.storeRepository.deleteStore(storeId);
  }
}
