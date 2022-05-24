import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findOne(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id }});
  }

  create(dto: CreateProductDto): Promise<Product> {
    const data: Product = { ...dto };

    return this.prisma.product.create({ data });
  }
  update(id: string, dto: UpdateProductDto): Promise<Product> {
    const data: Partial<Product> = { ...dto };

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.prisma.product.delete({ where: { id } });
  }
}
