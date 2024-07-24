import { UserEntity } from '@database/entities/user.entity';
import { RoleEnum } from '@domains/enums/RoleEnum';

export interface IRoleCreate {
  role: string;
  storeId: string;
  user?: UserEntity;
}
