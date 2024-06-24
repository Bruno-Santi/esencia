import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { GetUserDto } from './dto/get-user.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 500, ttl: 60000 } })
  @Post('login')
  findOne(@Body() getUserDto: GetUserDto) {
    console.log(getUserDto);

    return this.authService.findOne(getUserDto);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 500, ttl: 60000 } })
  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    console.log(createAuthDto);

    return this.authService.create(createAuthDto);
  }
  @Post('verify-email')
  verify(@Query('token') token: string) {
    console.log(token);

    return this.authService.verifyEmail(token);
  }

  @Post('resend-verification-email')
  resend(@Query('token') token: string) {
    console.log(token);

    return this.authService.resendVerificationEmail(token);
  }
}
