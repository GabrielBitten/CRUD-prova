import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard) 
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }
  @UseGuards(JwtAuthGuard) 
  @Post()
  create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard) 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(Number(id), updateUserDto);
  }
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
