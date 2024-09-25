import { Controller, Body, Get, Post, Delete } from '@nestjs/common';
import { ExpensesService } from '../services/expenses.service';

@Controller('expense')
export class ExpensesController {
  constructor(private readonly ExpensesService: ExpensesService) {}

  @Get()
  async findAll() {
    return this.ExpensesService.findAll();
  }

  @Post()
  async create(
    @Body()
    createExpenseDto: {
      userId: number;
      amount: number;
      category: string;
      date: Date;
      receiptId?: number;
    },
  ) {
    return this.ExpensesService.create(createExpenseDto);
  }
  @Delete()
  async delete(@Body() body: { idgasto: number }) {
    return this.ExpensesService.delete(body.idgasto);
  }
}
