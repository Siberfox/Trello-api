import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { UserColumn } from '../../columns.entity';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const columnRepo = getRepository(UserColumn);
    const request = context.switchToHttp().getRequest();

    try {
      await columnRepo.findOneOrFail(request.params.id);
    } catch (NotFoundException) {
      throw new NotFoundException(
        `Column with ID "${request.params.id}" not found`,
      );
    }

    const user = request.user;
    const reqOwnerId = (await columnRepo.findOneOrFail(request.params.id)).user
      .id;

    if (reqOwnerId == user.id) {
      return true;
    } else
      throw new BadRequestException(
        'You cannot edit or delete other users columns',
      );
  }
}
