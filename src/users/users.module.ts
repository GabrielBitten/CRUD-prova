import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    CacheModule.register({
      max: 100
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
