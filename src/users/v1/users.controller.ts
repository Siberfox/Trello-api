import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from './sign-up.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthTokenDto } from 'src/users/v1/users.dto';
import { SignInDto } from 'src/users/v1/sign-in.dto';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
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
