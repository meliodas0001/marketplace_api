import { RolesGuard } from './roles.guard';
import { RoleRepositoryMock } from '@test/mocks/roleRepository.mock';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';

const reflector = {
  getAllAndOverride: jest.fn().mockReturnValue([0]),
} as any;

const getContext: any = (bearer: string, storeId: string) => ({
  switchToHttp: () => {
    return {
      getRequest: () => {
        return {
          body: {
            storeId: storeId,
          },
          headers: {
            authorization: bearer,
          },
        };
      },
    };
  },
  getHandler: jest.fn().mockReturnValue([0]),
  getClass: jest.fn().mockReturnValue([0]),
});

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockImplementation((token: string) => {
    if (token === 'invalid') {
      throw new Error('Invalid token');
    }
    return true;
  }),
}));

describe('Roles guard', () => {
  let rolesGuard: RolesGuard;

  const store = {
    id: '1',
  };

  const roles = [
    {
      id: '1',
      role: 'Admin',
      storeId: '1',
    },
  ];

  beforeEach(() => {
    rolesGuard = new RolesGuard(
      reflector,
      RoleRepositoryMock,
      storeRepositoryMock,
    );
  });

  it('should pass', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      store,
    );
    (RoleRepositoryMock.findRoleByUserId as jest.Mock).mockResolvedValueOnce(
      roles,
    );

    await expect(
      rolesGuard.canActivate(getContext('Bearer valid', '1')),
    ).resolves.toEqual(true);
  });

  it('should throw a error if token is not provided', async () => {
    await expect(rolesGuard.canActivate(getContext('', '1'))).rejects.toThrow(
      'No token provided',
    );
  });

  it('should throw a error if storeId is not provided', async () => {
    await expect(
      rolesGuard.canActivate(getContext('Bearer valid', '')),
    ).rejects.toThrow('No storeId provided');
  });

  it('should throw a error if storeId is invalid', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      null,
    );

    await expect(
      rolesGuard.canActivate(getContext('Bearer valid', '2')),
    ).rejects.toThrow('Invalid storeId');
  });

  it('should throw a error if token is invalid', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      store,
    );

    await expect(
      rolesGuard.canActivate(getContext('Bearer invalid', '1')),
    ).rejects.toThrow('Invalid token');
  });
});
