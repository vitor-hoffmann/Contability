import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
  Put,
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
  @Get('getall')
  async findAll() {
    return this.userService.findAll();
  }
  @Get('getone')
  async findById(@Query('userid') userid: string) {
    return this.userService.findById(userid);
  }

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      avatar: string;
    },
  ) {
    await this.userService.create(body);
  }

  @Get('recover')
  async recover(@Query('email') email: string) {
    return await this.userService.recover(email);
  }
  @Post('reset')
  async reset(@Body() body: { token: string; password: string }) {
    return await this.userService.reset(body.token, body.password);
  }

  @Delete()
  async delete(@Body() body: { id: string }) {
    return await this.userService.delete(body.id);
  }

  @Put()
  async update(@Body() body: { id: string; name: string; avatar: string }) {
    return await this.userService.update(body);
  }

  @Get('activate')
  async activateAccount(@Query('token') token: string) {
    return await this.userService.confirmEmail(token);
  }
}
