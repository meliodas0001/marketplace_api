import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { IRoleCreate } from '@domains/dtos/roles/IRoleCreate';
import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IUserRepository } from '@domains/repositories/IUserRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    private rolesRepository: IRoleRepository,
    private usersRepository: IUserRepository,
    private storeRepository: IStoreRepository,
  ) {}

  async execute(roleCreate: IRoleCreate, email: string) {
    const store = await this.storeRepository.findStoreById(roleCreate.storeId);

    if (!store) throw new UnauthorizedException('Store not found');

    const user = await this.usersRepository.findByEmail(email);
    const role = await this.rolesRepository.findRoleByUserId(user.id);

    if (role.find((role) => role.storeId === roleCreate.storeId))
      throw new ConflictException('User role already exist');

    const roleCreated = await this.rolesRepository.create({
      ...roleCreate,
      user,
    });

    const { password, ...userWithoutPassword } = user;

    return { ...roleCreated, user: userWithoutPassword };
  }
}
