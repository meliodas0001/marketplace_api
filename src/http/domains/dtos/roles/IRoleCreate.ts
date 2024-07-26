import { UserEntity } from '@database/entities/user.entity';

export interface IRoleCreate {
  role: string;
  storeId: string;
  user?: UserEntity;
}
