import { IRoleRepository } from '@domains/repositories/IRoleRepository';

export const RoleRepositoryMock: IRoleRepository = {
  create: jest.fn(),
  findRoleByUserId: jest.fn(),
  createRoles: jest.fn(),
};
