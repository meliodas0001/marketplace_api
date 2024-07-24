import { IUserRepository } from '@domains/repositories/IUserRepository';

export const MockUserRepository: IUserRepository = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  findByIds: jest.fn(),
};
