import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    const { email, password } = body;

    const response = await this.authService.login(email, password);

    if (!response) {
      throw new BadRequestException('Invalid credentials');
    }
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('validatetoken')
  validateToken(@Request() req) {
    return {
      response: 200,
    };
  }
}
