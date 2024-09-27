import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

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
}
