import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

interface result {
  id: number;
  email: string;
  name: string;
  isConfirmed: number;
  createdAt: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<result | null> {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; isConfirmed: number } | null> {
    const user = await this.validateUser(email, password);

    if (!user) {
      return null;
    }

    const payload = { user };
    const token = this.jwtService.sign(payload);
    return {
      token: token,
      isConfirmed: user.isConfirmed,
    };
  }
}
