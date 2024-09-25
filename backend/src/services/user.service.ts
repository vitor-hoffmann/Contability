import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  async create(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({
      data,
    });
  }
  async delete(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
