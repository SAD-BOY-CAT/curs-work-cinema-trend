import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: LoginDto) {
    const { email, password } = data;
    const user = await this.userService.findOne(email);

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email, role: user.role };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: RegisterDto) {
    const user = await this.userService.findOne(data.email);

    if (user) throw new ConflictException('User already exists');

    await this.userService.create(data);

    return true;
  }
}
