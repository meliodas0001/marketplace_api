import { UserEntity } from '@database/entities/user.entity';
import { RoleEnum } from '@domains/enums/RoleEnum';

export interface IRoleCreate {
  role: RoleEnum;
  storeId: string;
  user: UserEntity;
}
