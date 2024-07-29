import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    private roleRepository: IRoleRepository,
    private storeRepository: IStoreRepository,
  ) {}

  async execute(
    userId: string,
    storeId: string,
    role: string,
    updUserId: string,
  ): Promise<void> {
    const findStore = await this.storeRepository.findStoreById(storeId);

    if (!findStore) throw new NotFoundException('Store not found');

    const findRole = await this.roleRepository.findRoleByUserId(userId);
    if (!findRole) throw new NotFoundException('Role not found');

    if (
      (findStore.ownerId != userId && role === 'Admin') ||
      findStore.ownerId === updUserId
    )
      throw new UnauthorizedException('User not authorized');

    await this.roleRepository.updateRole(updUserId, storeId, role);
  }
}
