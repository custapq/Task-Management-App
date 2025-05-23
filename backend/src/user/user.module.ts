import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
