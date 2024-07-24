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
    const storeUsers = await this.storeRepository.findStoreUsers(storeId);

    if (!storeUsers) throw new UnauthorizedException('Store not found');

    usersIds.forEach((userId) => {
      if (storeUsers[0].users.find((user) => user.id === userId))
        throw new UnauthorizedException(
          'User already in store, user id: ' + userId,
        );
    });

    const users = await this.userRepository.findByIds(usersIds);

    if (users.length !== usersIds.length)
      throw new UnauthorizedException('Some users not found');

    await this.storeRepository.addUsersToStore(storeId, users);
    await this.rolesRepository.createRoles(users, storeId);
  }
}
