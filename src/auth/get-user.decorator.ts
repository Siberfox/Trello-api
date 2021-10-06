import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entities';

export const GetUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext): User => {
    const { user } = ctx.switchToHttp().getRequest();

    if (data) {
      return user[data];
    }

    return user;
  },
);
