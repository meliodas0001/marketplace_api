import { UserEntity } from '@database/entities/user.entity';
import { ICreateUserDTO } from '@domains/dtos/ICreateUserDTO';

export abstract class IUserRepository {
  abstract create(user: ICreateUserDTO): Promise<void>;
  abstract findByEmail(email: string): Promise<UserEntity>;
}
