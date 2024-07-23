import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '@domains/enums/RoleEnum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
