import { ICreateUserDTO } from '@domains/dtos/ICreateUserDTO';
import { IUserRepository } from '@domains/repositories/IUserRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    await this.userRepository.create(data);
  }
}
