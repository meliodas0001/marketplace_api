import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IUserRepository } from '@domains/repositories/IUserRepository';

@Injectable()
export class FindAllStoresUseCase {
  constructor(
    private storeRepository: IStoreRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    return await this.storeRepository.findStoresByUserId(userId);
  }
}
