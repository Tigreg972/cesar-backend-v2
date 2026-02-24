import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './require-permissions.decorator';
import { USER_ROLE_UPDATE } from './permissions';

export const ROLE_PERMISSIONS: Record<string, bigint> = {
  student: 0n,
  teacher: 0n, // ou tes droits teacher existants
  admin: USER_ROLE_UPDATE, // + les autres permissions admin si tu en as
};

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required =
      this.reflector.getAllAndOverride<bigint[]>(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    if (!required.length) return true;

    const { user } = context.switchToHttp().getRequest();

    return required.every((perm) => (BigInt(user.permissions) & perm) === perm);
  }
}