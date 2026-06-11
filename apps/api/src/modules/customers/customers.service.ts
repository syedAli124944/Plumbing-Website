import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' }, include: { _count: { select: { appointments: true, quotes: true } } } }),
      this.prisma.customer.count(),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 } };
  }

  async findById(id: string) {
    const customer = await this.prisma.customer.findUnique({ where: { id }, include: { appointments: { orderBy: { scheduledAt: 'desc' }, take: 10 }, quotes: { orderBy: { createdAt: 'desc' }, take: 10 } } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async findOrCreate(data: { name: string; email: string; phone: string; address?: string }) {
    const existing = await this.prisma.customer.findUnique({ where: { email: data.email } });
    if (existing) return existing;
    return this.prisma.customer.create({ data });
  }
}
