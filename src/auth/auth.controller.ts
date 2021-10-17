import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/dto/sign-up.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthTokenDto } from 'src/users/dto/users.dto';
import { SignInDto } from 'src/users/dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({
    type: AuthTokenDto,
  })
  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<AuthTokenDto> {
    return this.authService.signIn(signInDto);
  }
}
