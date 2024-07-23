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
  let loginUseCase: LoginUseCase;

  const user = {
    email: 'johndoe@emai.com',
    password: 'hashed_password',
  };

  const findUser = {
    email: 'johndoe@emai.com',
    password: 'hashed_password',
    id: '1',
    name: 'johndoe',
  };

  beforeEach(() => {
    loginUseCase = new LoginUseCase(MockUserRepository);
  });

  it('should login a user', async () => {
    (MockUserRepository.findByEmail as jest.Mock).mockResolvedValueOnce(
      findUser,
    );

    const token = await loginUseCase.execute(user);

    expect(token).toEqual('token');
  });

  it('it should return a error if user doesnt exist', async () => {
    (MockUserRepository.findByEmail as jest.Mock).mockResolvedValueOnce({});

    await expect(loginUseCase.execute(user)).rejects.toThrow(
      'Email or password incorrect',
    );
  });

  it('should not login a user if password is incorrect', async () => {
    (MockUserRepository.findByEmail as jest.Mock).mockResolvedValueOnce({
      ...findUser,
      password: 'wrongpass',
    });

    await expect(loginUseCase.execute(user)).rejects.toThrow(
      'Email or password incorrect',
    );
  });
});
