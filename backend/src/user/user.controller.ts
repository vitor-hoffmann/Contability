import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
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

  @Get('recover')
  async recover(@Query('email') email: string) {
    return await this.userService.recover(email);
  }

  @Delete()
  async delete(@Body() body: { id: number }) {
    return this.userService.delete(body.id);
  }

  @Get('activate')
  async activateAccount(@Query('token') token: string) {
    return this.userService.confirmEmail(token);
  }
}
