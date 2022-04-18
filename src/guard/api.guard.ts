import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/decorators.guard';
import { User } from '../api/user/user.entity';
import { Role } from '../models/user/roles.enum';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(_context: ExecutionContext) {
    const request = _context.switchToHttp().getRequest<Request>();

    const user = request['user'] as User;

    request['user'] = user;

    const roles = this.reflector.get<Role[]>(ROLES_KEY, _context.getHandler());

    if (roles.some((role) => user.role === role)) {
      return true;
    }

    new HttpException(
      {
        message: "Don't have permissions",
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
