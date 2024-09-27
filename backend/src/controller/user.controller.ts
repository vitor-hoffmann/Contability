import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(
    @Body() body: { name: string; email: string; password: string },
  ) {
    await this.userService.create(body);
  }

  @Delete()
  async delete(@Body() body: { id: number }) {
    return this.userService.delete(body.id);
  }
}
