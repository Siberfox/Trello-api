import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { Card } from '../../cards.entity';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const cardRepo = getRepository(Card);
    const request = context.switchToHttp().getRequest();

    try {
      await cardRepo.findOneOrFail(request.params.id);
    } catch (NotFoundException) {
      throw new NotFoundException(
        `Card with ID "${request.params.id}" not found`,
      );
    }

    const user = request.user;
    const reqOwnerId = (await cardRepo.findOneOrFail(request.params.id)).user
      .id;

    if (reqOwnerId == user.id) {
      return true;
    } else
      throw new BadRequestException(
        'You cannot edit or delete other users cards',
      );
  }
}
