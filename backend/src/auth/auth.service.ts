import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register-local.dto';
import { LoginDto } from './dto/login-local.dto';
import { compare } from 'bcrypt';
import { Payload } from './interfaces/payload.interface';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.getUserByEmail(email);
    // console.log('Login password:', password);
    // console.log('DB password:', user.dataValues.password);

    if (!user || !user.dataValues.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await compare(password, user.dataValues.password);
    if (!isPasswordValid) return null;
    return user;
  }

  async login(user: Payload) {
    console.log('user login :', user);
    const dummyUser: User = user as User;
    const { email, userId } = dummyUser.dataValues;
    const payload = { email, userId };
    console.log('payload:', payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.createUser(registerDto);
    return user;
  }
}
