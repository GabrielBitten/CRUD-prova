import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PetsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
