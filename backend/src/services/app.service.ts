import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<{ name: string; email: string }[]> {
    const users = await this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
      },
    });
    return users;
  }
}
