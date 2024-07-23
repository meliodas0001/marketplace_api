import 'dotenv/config';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IPayload } from '@domains/dtos/users/IPayload';
import { RoleEnum } from '@domains/enums/RoleEnum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleRepository: IRoleRepository,
    private storeRepository: IStoreRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    const storeId = request.body.storeId;
    if (!storeId) throw new UnauthorizedException('No storeId provided');

    const store = await this.storeRepository.findStoreById(storeId);
    if (!store) throw new UnauthorizedException('Invalid storeId');

    try {
      const user = verify(token, process.env.API_SECRET) as IPayload;

      const userRoles = await this.roleRepository.findRoleByUserId(user.id);

      if (!userRoles) {
        return false;
      }

      const filteredUserRoles = userRoles.filter((x) => x.storeId === storeId);

      return requiredRoles.some((role) =>
        filteredUserRoles.some(
          (userRole) => role === RoleEnum[`${userRole.role}`],
        ),
      );
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
