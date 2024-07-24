import { UserEntity } from '@database/entities/user.entity';

export interface IAddUsersToStore {
  users: UserEntity[];
}
