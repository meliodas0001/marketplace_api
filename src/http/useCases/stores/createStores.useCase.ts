import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';
import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IUserRepository } from '@domains/repositories/IUserRepository';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class CreateStoresUseCase {
  constructor(
    private storeRepository: IStoreRepository,
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
  ) {}

  async execute(storeCreate: IStoreCreateDTO, email: string) {
    const user = await this.userRepository.findByEmail(email);

    const userStores = await this.storeRepository.findStoreByOwnerId(user.id);

    if (userStores.find((store) => store.store_name === storeCreate.store_name))
      throw new ConflictException('Store already exists');

    const store = await this.storeRepository.create(storeCreate, user);
    await this.roleRepository.create({
      role: 'Admin',
      user: user,
      storeId: store.id,
    });

    store.users.map((user) => delete user.password);

    return store;
  }
}
