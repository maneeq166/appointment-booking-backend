import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test')
  test() {
    return this.authService.test();
  }

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }
}
