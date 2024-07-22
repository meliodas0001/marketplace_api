import { IRoleCreate } from '@domains/dtos/roles/IRoleCreate';
import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IUserRepository } from '@domains/repositories/IUserRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    private rolesRepository: IRoleRepository,
    private usersRepository: IUserRepository,
  ) {}

  async execute(roleCreate: IRoleCreate, email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const role = {
      ...roleCreate,
      user,
    };

    const roleCreated = await this.rolesRepository.create(role);

    return roleCreated;
  }
}
