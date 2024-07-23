import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { FindStoreUsersUseCase } from './findStoreUsers.useCase';

describe('Find store users UseCase', () => {
  let findStoreUsersUseCase: FindStoreUsersUseCase;

  const storeUsers = {
    id: '1',
    ownerId: '1',
    users: [
      {
        id: '1',
        name: 'johndoe',
        email: 'johndoe@email.com',
      },
    ],
  };

  beforeEach(async () => {
    findStoreUsersUseCase = new FindStoreUsersUseCase(storeRepositoryMock);
  });

  it('should return store users', async () => {
    (storeRepositoryMock.findStoreUsers as jest.Mock).mockResolvedValueOnce(
      storeUsers,
    );

    await expect(findStoreUsersUseCase.execute('1')).resolves.toEqual(
      storeUsers,
    );
  });

  it('should return a error if store not exist', async () => {
    (storeRepositoryMock.findStoreUsers as jest.Mock).mockResolvedValueOnce(
      null,
    );

    await expect(findStoreUsersUseCase.execute('1')).rejects.toThrow(
      'Store not found',
    );
  });
});
