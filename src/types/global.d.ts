import { IPayload } from '@domains/dtos/users/IPayload';
namespace NodeJS {
  interface ProcessEnv {
    API_SECRET: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}

declare module 'express' {
  interface Request {
    user?: IPayload;
  }
}
