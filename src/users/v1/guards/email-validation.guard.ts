import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class EmailValidationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userRepo = getRepository(User);
    const request = context.switchToHttp().getRequest();

    const email = await userRepo.findOne({
      where: { email: request.body.email },
    });

    if (email) {
      throw new ConflictException('Email already exists');
    }
    return true;
  }
}
