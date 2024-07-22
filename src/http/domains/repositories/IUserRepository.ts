import { UserEntity } from '@database/entities/user.entity';
import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';
import { IUserDTO } from '@domains/dtos/users/IUserDTO';

export abstract class IUserRepository {
  abstract create(user: ICreateUserDTO): Promise<IUserDTO>;
  abstract findByEmail(email: string): Promise<UserEntity>;
}
