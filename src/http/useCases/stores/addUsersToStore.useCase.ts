import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IUserRepository } from '@domains/repositories/IUserRepository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AddUsersToStoreUseCase {
  constructor(
    private userRepository: IUserRepository,
    private storeRepository: IStoreRepository,
    private rolesRepository: IRoleRepository,
  ) {}

  async execute(storeId: string, usersIds: string[]): Promise<void> {
    const store = await this.storeRepository.findStoreById(storeId);

    if (!store) throw new UnauthorizedException('Store not found');

    const users = await this.userRepository.findByIds(usersIds);

    if (users.length !== usersIds.length)
      throw new UnauthorizedException('Some users not found');

    await this.storeRepository.addUsersToStore(storeId, users);
    await this.rolesRepository.createRoles(users, storeId);
  }
}
