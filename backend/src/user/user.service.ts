import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(createUserDto.password, salt);
      const user = await this.userRepository.create({
        email: createUserDto.email,
        password: hashedPassword,
      });
      console.log('user created', user);

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Error in createUser()',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'error in findOne() user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { userId: id },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'error in findOne() user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
