import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() body: { name: string; email: string }) {
    return this.userService.create(body);
  }
}
