import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

@Injectable()
export class TablesService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(data: { name: string | null; userId: string | null }) {
    const table = await this.prisma.table.create({
      data: {
        name: data.name,
        user: {
          connect: {
            id: data.userId,
          },
        },
        columns: {
          create: [
            {
              name: 'first column',
            },
          ],
        },
        rows: {
          create: [
            {
              data: JSON.parse(JSON.stringify({ name: 'first row' })),
            },
          ],
        },
      },
    });

    return table;
  }

  async delete(tableid: number) {
    await this.prisma.column.deleteMany({
      where: { tableId: Number(tableid) },
    });

    await this.prisma.row.deleteMany({
      where: { tableId: Number(tableid) },
    });

    await this.prisma.attachment.deleteMany({
      where: { tableId: Number(tableid) },
    });

    return await this.prisma.table.delete({
      where: {
        id: Number(tableid),
      },
    });
  }
}
