import { MockUserRepository } from '../../../../test/mocks/userRepository.mock';
import { CreateUserUseCase } from './createUser.useCase';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('createUserUseCase', () => {
  const mockUserRepository = MockUserRepository;
  const createUserUseCase = new CreateUserUseCase(mockUserRepository);

  it('should create a user', async () => {
    const user = {
      email: 'null',
      password: '123456',
      name: 'John Doe',
    };

    const createdUser = await createUserUseCase.execute(user);

    expect(createdUser).toHaveProperty('email');
    expect(createdUser).toHaveProperty('name');
    expect(createdUser).toHaveProperty('id');
  });

  it('should return user already exist', () => {
    const user = {
      email: 'return_user',
      password: '123456',
      name: 'John Doe',
    };

    expect(createUserUseCase.execute(user)).rejects.toThrow(
      'User already exists',
    );
  });
});
