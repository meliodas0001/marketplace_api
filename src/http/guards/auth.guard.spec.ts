import { AuthGuard } from './auth.guard';

const getContext: any = (bearer: string) => ({
  switchToHttp: () => {
    return {
      getRequest: () => {
        return {
          headers: {
            authorization: bearer,
          },
        };
      },
    };
  },
});

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockImplementation((token: string) => {
    if (token === 'invalid') {
      throw new Error('Invalid token');
    }
    return true;
  }),
}));

describe('AuthGuard', () => {
  const authGuard = new AuthGuard();

  it('should pass', async () => {
    const auth = await authGuard.canActivate(getContext('Bearer token'));

    expect(auth).toBe(true);
  });

  it('should throw an error if token is not provided', async () => {
    await expect(authGuard.canActivate(getContext(''))).rejects.toThrow(
      'Token not provided',
    );
  });

  it('should throw an error if token is invalid', async () => {
    await expect(
      authGuard.canActivate(getContext('Bearer invalid')),
    ).rejects.toThrow('Invalid token');
  });
});
