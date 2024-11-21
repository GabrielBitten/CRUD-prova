import { Get, Injectable } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(private readonly usersService: UsersService) {}
  private users = [];
  private idCounter = 1; 

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: any) {
    const newUser = { id: this.idCounter++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: any) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...updatedUser };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const deletedUser = this.users.splice(index, 1);
    return deletedUser[0];
  }
  
  @CacheKey('allUsers') 
  @Get()
  async getAllPets() {
    return this.usersService.findAll();
  }
}
