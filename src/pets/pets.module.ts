import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { PetsController } from './pets.controller'; 
import { PetsService } from './pets.service'; 

@Module({
  imports: [
    CacheModule.register({
      max: 100,  
    }),
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
