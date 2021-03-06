import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from '../users/v1/sign-up.dto';
import { UserRepository } from '../users/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.types';
import { AuthTokenDto } from 'src/users/v1/users.dto';
import { SignInDto } from 'src/users/v1/sign-in.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.userRepository.createUser(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<AuthTokenDto> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async getMe(user: User): Promise<User> {
    return user;
  }
}
