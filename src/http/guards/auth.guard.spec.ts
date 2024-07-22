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
    token === 'invalid' ? false : true;
  }),
}));

describe('AuthGuard', () => {
  const authGuard = new AuthGuard();

  it('should pass', async () => {
    const auth = await authGuard.canActivate(getContext('Bearer token'));

    expect(auth).toBe(true);
  });

  it('should throw an error if token is not provided', async () => {
    expect(authGuard.canActivate(getContext(''))).rejects.toThrow(
      'Token not provided',
    );
  });

  it('should throw an error if token is invalid', async () => {
    expect(authGuard.canActivate(getContext('Bearer invalid'))).rejects.toThrow(
      'Invalid token',
    );
  });
});
