import { MockUserRepository } from '@test/mocks/userRepository.mock';
import { LoginUseCase } from './login.useCase';

jest.mock('bcrypt', () => ({
  compare: jest
    .fn()
    .mockImplementation((password: string, passwordb: string) => {
      if (password && passwordb === 'hashed_password') {
        return true;
      }

      return false;
    }),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockResolvedValue('token'),
}));

describe('login useCase', () => {
  const loginUseCase = new LoginUseCase(MockUserRepository);
  it('should login a user', async () => {
    const user = {
      email: 'return_user',
      password: 'hashed_password',
    };

    expect(await loginUseCase.execute(user)).toBe('token');
  });

  it('should not return a token', async () => {
    const user = {
      email: 'null',
      password: 'wrong_password',
    };

    expect(loginUseCase.execute(user)).rejects.toThrow(
      'Email or password incorrect',
    );
  });

  it('should not return a token', async () => {
    const user = {
      email: 'null',
      password: '123456',
    };

    expect(loginUseCase.execute(user)).rejects.toThrow(
      'Email or password incorrect',
    );
  });
});
