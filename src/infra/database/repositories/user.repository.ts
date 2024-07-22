import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '@database/entities/user.entity';

import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';
import { IUserRepository } from '@domains/repositories/IUserRepository';
import { IUserDTO } from '@domains/dtos/users/IUserDTO';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}

  async create(user: ICreateUserDTO): Promise<IUserDTO> {
    const userCreated = this.userEntity.create(user);

    userCreated.stores = [];

    await this.userEntity.save(userCreated);

    return {
      name: userCreated.name,
      email: userCreated.email,
      id: userCreated.id,
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userEntity.findOne({
      where: {
        email,
      },
      select: {
        password: true,
        email: true,
        id: true,
        name: true,
        role: true,
      },
    });
  }
}
