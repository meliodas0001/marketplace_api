import { ILoginDTO } from '@domains/dtos/users/ILoginDTO';
import { IUserRepository } from '@domains/repositories/IUserRepository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ILoginDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new UnauthorizedException('Email or password incorrect');
    const isPasswordCorrect = await compare(data.password, user.password);

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Email or password incorrect');

    const payload = { email: user.email, id: user.id };

    const accessToken = await sign(payload, process.env.API_SECRET, {
      expiresIn: '1d',
    });

    return accessToken;
  }
}
