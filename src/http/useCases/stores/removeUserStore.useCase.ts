import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RemoveUserStoreUseCase {
  constructor(
    private storeRepository: IStoreRepository,
    private roleRepository: IRoleRepository,
  ) {}

  async execute(storeId: string, userId: string): Promise<void> {
    const store = await this.storeRepository.findStoreById(storeId);

    if (!store) throw new NotFoundException('Store not found');
    if (store.ownerId === userId)
      throw new UnauthorizedException(
        "You can't remove the owner of the store",
      );

    const findUserByStore = await this.storeRepository.findUserByStore(
      storeId,
      userId,
    );

    if (!findUserByStore)
      throw new NotFoundException('User not found in store');

    await this.roleRepository.deleteRole(userId, storeId);
    await this.storeRepository.deleteUserFromStore(storeId, userId);
  }
}
