import { RolesEntity } from '@database/entities/roles.entity';
import { UserEntity } from '@database/entities/user.entity';
import { IRoleCreate } from '@domains/dtos/roles/IRoleCreate';

export abstract class IRoleRepository {
  abstract create(RoleCreate: IRoleCreate): Promise<RolesEntity>;
  abstract createRoles(users: UserEntity[], storeId: string): Promise<void>;
  abstract findRoleByUserId(userId: string): Promise<RolesEntity[]>;
  abstract updateRole(
    userId: string,
    storeId: string,
    role: string,
  ): Promise<void>;
  abstract deleteRole(userId: string, storeId: string): Promise<void>;
}
