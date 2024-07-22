import { RolesEntity } from '@database/entities/roles.entity';
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

  async findRoleByUserId(userId: string): Promise<RolesEntity> {
    const role = await this.rolesEntity.findOne({
      where: {
        id: userId,
      },
    });

    return role;
  }
}
