import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.validateUser(email, password);

    if (!user) {
      return null;
    }

    const payload = { email: user.email, sub: user.id, name: user.name };
    return this.jwtService.sign(payload);
  }
}
