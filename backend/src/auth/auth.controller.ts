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
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ token: string }> {
    const { email, password } = body;

    const token = await this.authService.login(email, password);

    if (!token) {
      throw new BadRequestException('Invalid credentials');
    }
    return { token: token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('validatetoken')
  validateToken(@Request() req) {
    return {
      id: req.user.userId,
      email: req.user.email,
      name: req.user.name,
    };
  }
}
