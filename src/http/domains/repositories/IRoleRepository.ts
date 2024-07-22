import { RolesEntity } from '@database/entities/roles.entity';
import { IRoleCreate } from '@domains/dtos/roles/IRoleCreate';

export abstract class IRoleRepository {
  abstract create(RoleCreate: IRoleCreate): Promise<RolesEntity>;
  abstract findRoleByUserId(userId: string): Promise<RolesEntity>;
}
