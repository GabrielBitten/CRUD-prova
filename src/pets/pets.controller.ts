import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}
  @UseGuards(JwtAuthGuard) 
  @Get()
  findAll(): Pet[] {
    return this.petsService.findAll();
  }
  @UseGuards(JwtAuthGuard) 
  @Get(':id')
  findOne(@Param('id') id: string): Pet | undefined {
    return this.petsService.findOne(Number(id));
  }
  @UseGuards(JwtAuthGuard)   
  @Post()
  create(@Body() createPetDto: Partial<Pet>): Pet {
    return this.petsService.create(createPetDto);
  }
  @UseGuards(JwtAuthGuard) 
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePetDto: Partial<Pet>): Pet | null {
    return this.petsService.update(Number(id), updatePetDto);
  }
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  remove(@Param('id') id: string): Pet | null {
    return this.petsService.remove(Number(id));
  }
}
