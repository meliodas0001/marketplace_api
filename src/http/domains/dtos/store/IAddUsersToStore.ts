import { UserEntity } from '@database/entities/user.entity';

export interface IAddUsersToStore {
  storeId: string;
  usersIds: string[];
}
