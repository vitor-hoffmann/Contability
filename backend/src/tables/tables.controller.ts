import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

type ColumnsType = {
  id: number;
  name: string;
  table: TablesType;
  tableId: number;
};
type RowsType = {
  id: number;
  table: TablesType;
  tableId: number;
  data: JSON;
};
type AttachmentsType = {
  id: number;
  table: TablesType;
  tableId: number;
  url: string;
  createdAt: Date;
};
type TablesType = {
  id: number;
  name: string;
  user: User;
  userId: number;
  columns: ColumnsType[];
  rows: RowsType[];
  createdAt: Date;
  attachments: AttachmentsType[];
};
type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: Date;
  tables: TablesType[];
};

@Controller('tables')
export class TablesController {
  constructor(
    private readonly tablesService: TablesService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    body: {
      name: string | null;
      userId: string | null;
    },
  ) {
    return await this.tablesService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('tableid') tableid: number) {
    return await this.tablesService.delete(tableid);
  }
}
