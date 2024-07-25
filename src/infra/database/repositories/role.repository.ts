import { RolesEntity } from '@database/entities/roles.entity';
import { UserEntity } from '@database/entities/user.entity';
import { IRoleCreate } from '@domains/dtos/roles/IRoleCreate';
import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RolesEntity) private rolesEntity: Repository<RolesEntity>,
  ) {}

  async create(RoleCreate: IRoleCreate): Promise<RolesEntity> {
    const { role, storeId, user } = RoleCreate;

    const roleCreated = this.rolesEntity.create({ role: `${role}`, storeId });

    roleCreated.user = user;
    await this.rolesEntity.save(roleCreated);

    return roleCreated;
  }

  async createRoles(users: UserEntity[], storeId: string): Promise<void> {
    const roles = users.map((user) => {
      return this.rolesEntity.create({
        role: 'User',
        storeId,
        user,
      });
    });

    await this.rolesEntity.save(roles);
  }

  async findRoleByUserId(userId: string): Promise<RolesEntity[]> {
    const role = await this.rolesEntity.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return role;
  }

  async updateRole(
    userId: string,
    storeId: string,
    role: string,
  ): Promise<void> {
    const findRole = await this.rolesEntity.findOne({
      where: {
        id: userId,
        storeId: storeId,
      },
    });

    findRole.role = role;
    await this.rolesEntity.save(findRole);
  }
}
