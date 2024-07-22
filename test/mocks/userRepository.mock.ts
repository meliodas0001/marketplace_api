import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';
import { IUserRepository } from '@domains/repositories/IUserRepository';

import { UserEntity } from '@database/entities/user.entity';

export const MockUserRepository: IUserRepository = {
  create: jest.fn().mockImplementation(async (user: ICreateUserDTO) => ({
    id: uuid(),
    email: user.email,
    name: user.name,
  })),

  findByEmail: jest.fn().mockImplementation(async (email: string) => {
    switch (email) {
      case 'return_user':
        return {
          id: 'mocked_id',
          email: 'sla',
          password: 'hashed_password',
          name: 'new_user',
          role: [],
          stores: [],
        };
      case 'null':
        return null;
      case 'store_null':
        return {
          id: 'null',
          email: 'sla',
          password: 'hashed_password',
          name: 'new_user',
          role: [],
        };
      case 'role_null':
        return {
          id: 'null',
          email: 'sla',
          password: 'hashed_password',
          name: 'new_user',
          role: [],
        };
    }
  }),
};
