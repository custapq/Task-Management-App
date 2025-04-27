import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RegisterDto } from './dto/register-local.dto';
import { UserRequest } from './interfaces/user-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('in register() called');
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: UserRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: UserRequest) {
    console.log(req.user);
    return req.user;
  }
}
