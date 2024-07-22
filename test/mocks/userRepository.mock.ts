import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';
import { IUserRepository } from '@domains/repositories/IUserRepository';

import { UserEntity } from '@database/entities/user.entity';

export const MockUserRepository: IUserRepository = {
  create: jest.fn().mockImplementation(async (user: ICreateUserDTO) => ({
    ...user,
  })),

  findByEmail: jest
    .fn()
    .mockImplementation(async (email: string): Promise<UserEntity | null> => {
      return {
        id: uuid(),
        email,
        password: 'hashed_password',
        name: 'John Doe',
        role: [],
        stores: [],
      };
    }),
};
