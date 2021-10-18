import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SignUpDto } from './v1/sign-up.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto): Promise<void> {
    const { email, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ email, password: hashedPassword });

    await this.save(user);
  }
}
