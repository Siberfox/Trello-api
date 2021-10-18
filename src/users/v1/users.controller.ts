import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from './sign-up.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthTokenDto } from 'src/users/v1/users.dto';
import { SignInDto } from 'src/users/v1/sign-in.dto';
import { EmailValidationGuard } from './guards/email-validation.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '../user.entity';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @Post('/signup')
  @UseGuards(EmailValidationGuard)
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

  @ApiOperation({ summary: 'Get me' })
  @ApiOkResponse({
    type: User,
  })
  @Get('/me')
  getMe(@GetUser() user: User): Promise<User> {
    return this.authService.getMe(user);
  }
}
