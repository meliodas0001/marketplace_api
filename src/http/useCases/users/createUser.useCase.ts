import { ConflictException, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

import { IUserRepository } from '@domains/repositories/IUserRepository';
import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const findUser = await this.userRepository.findByEmail(data.email);

    if (findUser) throw new ConflictException('User already exists');

    const salt = await genSalt(10);
    const password = await hash(data.password, salt);

    const user = {
      ...data,
      password,
    };

    await this.userRepository.create(user);
  }
}
