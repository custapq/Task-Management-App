import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../interfaces/payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Payload): Promise<Payload> {
    console.log('JWT strategy validate');
    // console.log('JWT strategy payload:', payload);
    const user = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    // console.log('JWT strategy user:', user);

    return {
      userId: user.dataValues.userId,
      email: user.dataValues.email,
    };
  }
}
