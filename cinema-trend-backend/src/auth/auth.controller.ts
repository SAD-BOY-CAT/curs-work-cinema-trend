import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto);
  }

  @Post('create')
  async registration(@Body() regDto: RegisterDto) {
    return await this.authService.signUp(regDto);
  }
}
