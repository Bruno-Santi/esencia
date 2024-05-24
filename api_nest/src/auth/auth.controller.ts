import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { GetUserDto } from './dto/get-user.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ThrottlerGuard)
  @Post('login')
  findOne(@Body() getUserDto: GetUserDto) {
    console.log(getUserDto);

    return this.authService.findOne(getUserDto);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    console.log(createAuthDto);

    return this.authService.create(createAuthDto);
  }
}
