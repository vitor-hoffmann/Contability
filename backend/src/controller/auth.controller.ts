import {
  Controller,
  Post,
  Body,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ): Promise<{ token: string }> {
    const { email, password } = body;

    const token = await this.authService.login(email, password);

    if (!token) {
      throw new BadRequestException('Invalid credentials');
    }
    res.cookie('jwt', token, {
      httpOnly: true, // O cookie só pode ser acessado pelo servidor
      secure: process.env.NODE_ENV === 'production', // Somente HTTPS em produção
      maxAge: 3600000, // 1 hora
    });
    res.status(200);
    return { token: token };
  }
}
