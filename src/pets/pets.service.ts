import { Get, Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Injectable()
export class PetsService {
  constructor(private readonly petsService: PetsService) {}
  private pets: Pet[] = [];
  private idCounter = 1;

  findAll(): Pet[] {
    return this.pets;
  }

  findOne(id: number): Pet | undefined {
    return this.pets.find((pet) => pet.id === id);
  }

  create(petData: Partial<Pet>): Pet {
    const newPet: Pet = { id: this.idCounter++, ...petData } as Pet;
    this.pets.push(newPet);
    return newPet;
  }

  update(id: number, petData: Partial<Pet>): Pet | null {
    const index = this.pets.findIndex((pet) => pet.id === id);
    if (index === -1) return null;

    this.pets[index] = { ...this.pets[index], ...petData };
    return this.pets[index];
  }

  remove(id: number): Pet | null {
    const index = this.pets.findIndex((pet) => pet.id === id);
    if (index === -1) return null;

    const [deletedPet] = this.pets.splice(index, 1);
    return deletedPet;
  }

  @CacheKey('allPets') 
  @Get()
  async getAllPets() {
    return this.petsService.findAll();
  }
}
