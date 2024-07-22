import { IRoleCreate } from '@domains/dtos/roles/IRoleCreate';
import { IRoleRepository } from '@domains/repositories/IRoleRepository';

export const RoleRepositoryMock: IRoleRepository = {
  create: jest.fn().mockImplementation(async (RoleCreate: IRoleCreate) => ({
    id: 'mocked_id',
    role: 'Admin',
    storeId: RoleCreate.storeId,
    user: {
      id: 'mocked_user_id',
      name: 'mocked_user_name',
      email: 'mocked_user',
    },
  })),
  findRoleByUserId: jest.fn().mockImplementation(async (userId: string) => {
    switch (userId) {
      case 'null':
        return [
          {
            id: 'null',
            role: 'mocked_role',
            storeId: 'mocked_store_id',
            user: {
              id: 'mocked_user_id',
              name: 'mocked_user_name',
              email: 'mocked_user_email',
            },
          },
        ];
      case 'mocked_id':
        return [
          {
            id: 'mocked_id',
            role: 'mocked_role',
            storeId: 'mocked_id',
            user: {
              id: 'mocked_user_id',
              name: 'mocked_user_name',
              email: 'mocked_user_email',
            },
          },
        ];
    }
  }),
};
