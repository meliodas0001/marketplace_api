import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IPayload } from '@domains/dtos/users/IPayload';
import { RoleEnum } from '@domains/enums/RoleEnum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleRepository: IRoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    const storeId = request.body.storeId;

    if (!storeId) return false;

    try {
      const user = verify(token, process.env.API_SECRET) as IPayload;
      const userRoles = await this.roleRepository.findRoleByUserId(user.id);

      if (!userRoles) {
        return false;
      }

      const filteredUserRoles = userRoles.filter((x) => x.storeId === storeId);

      return requiredRoles.some((role) =>
        filteredUserRoles.some((userRole) => userRole.role === `${role}`),
      );
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
