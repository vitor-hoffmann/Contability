import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.expense.findMany();
  }

  async create(data: {
    userId: number;
    amount: number;
    category: string;
    date: Date;
    receiptId?: number;
  }) {
    return this.prisma.expense.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        category: data.category,
        date: data.date,
        receiptId: data.receiptId ?? null,
      },
    });
  }
  async delete(idgasto: number) {
    return this.prisma.expense.delete({
      where: {
        id: idgasto,
      },
    });
  }
}
