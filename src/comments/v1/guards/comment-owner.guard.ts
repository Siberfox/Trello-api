import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { Comment } from '../../comments.entity';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const commentRepo = getRepository(Comment);
    const request = context.switchToHttp().getRequest();

    try {
      await commentRepo.findOneOrFail(request.params.id);
    } catch (NotFoundException) {
      throw new NotFoundException(
        `Comment with ID "${request.params.id}" not found`,
      );
    }

    const user = request.user;
    const reqOwnerId = (await commentRepo.findOneOrFail(request.params.id)).user
      .id;

    if (reqOwnerId == user.id) {
      return true;
    } else
      throw new BadRequestException(
        'You cannot edit or delete other users comments',
      );
  }
}
