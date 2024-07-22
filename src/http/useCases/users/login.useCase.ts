import { ILoginDTO } from '@domains/dtos/users/ILoginDTO';
import { IUserRepository } from '@domains/repositories/IUserRepository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: ILoginDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new UnauthorizedException('Email or password incorrect');
    const isPasswordCorrect = await compare(data.password, user.password);

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Email or password incorrect');

    const payload = { email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.API_SECRET,
      expiresIn: '1d',
    });

    return accessToken;
  }
}
