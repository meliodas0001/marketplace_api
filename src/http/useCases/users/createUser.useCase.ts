import { ConflictException, Injectable } from '@nestjs/common';

import { IUserRepository } from '@domains/repositories/IUserRepository';
import { ICreateUserDTO } from '@domains/dtos/ICreateUserDTO';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const findUser = await this.userRepository.findByEmail(data.email);

    if (!findUser) throw new ConflictException('User already exists');

    await this.userRepository.create(data);
  }
}
