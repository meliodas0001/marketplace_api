import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';
import { MockUserRepository } from '../../../../test/mocks/userRepository.mock';
import { CreateUserUseCase } from './createUser.useCase';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('createUserUseCase', () => {
  const mockUserRepository = MockUserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockUserRepository);

    jest.clearAllMocks();
  });

  const createUser: ICreateUserDTO = {
    email: 'johndoe@email.com',
    name: 'johndoe',
    password: 'password',
  };

  const createUserResolved = {
    id: '1',
    email: 'johndoe@email.com',
    name: 'johndoe',
    password: 'password',
  };

  it('should create a user', async () => {
    (mockUserRepository.create as jest.Mock).mockResolvedValueOnce(
      createUserResolved,
    );

    const user = await createUserUseCase.execute(createUser);

    expect(user).toEqual(createUserResolved);
  });

  it('should not create a user if it already exists', async () => {
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValueOnce(
      createUser,
    );

    await expect(createUserUseCase.execute(createUser)).rejects.toThrow(
      'User already exists',
    );
  });
});
