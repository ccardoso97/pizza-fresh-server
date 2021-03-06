import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTableDto } from './dto/update-table.dto'
import { Table } from './entitites/table.entity';

@Injectable()
export class TableService {

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  findOne(id: string): Promise<Table> {
    return this.prisma.table.findUnique({ where: { id }});
  }

  create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };

    return this.prisma.table.create({ data });
  }
  update(id: string, dto: UpdateTableDto): Promise<Table> {
    const data: Partial<Table> = { ...dto };

    return this.prisma.table.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.prisma.table.delete({ where: { id } });
  }
}
