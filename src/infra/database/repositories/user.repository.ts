import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '@database/entities/user.entity';

import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';
import { IUserRepository } from '@domains/repositories/IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}

  async create(user: ICreateUserDTO): Promise<void> {
    const userCreated = this.userEntity.create(user);

    await this.userEntity.save(userCreated);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userEntity.findOne({
      where: {
        email,
      },
    });
  }
}
