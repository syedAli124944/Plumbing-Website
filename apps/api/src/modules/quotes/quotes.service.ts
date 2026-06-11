import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateQuoteDto } from './dto/quote.dto';

export type QuoteStatus = 'NEW' | 'REVIEWED' | 'QUOTED' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateQuoteDto) {
    let customer = await this.prisma.customer.findUnique({ where: { email: dto.email } });
    if (!customer) {
      customer = await this.prisma.customer.create({ data: { name: dto.name, email: dto.email, phone: dto.phone, address: dto.address } });
    }
    return this.prisma.quote.create({
      data: { customerId: customer.id, serviceType: dto.serviceType, description: dto.description, address: dto.address, preferredDate: dto.preferredDate ? new Date(dto.preferredDate) : null },
      include: { customer: true },
    });
  }

  async findAll(page = 1, limit = 10, status?: QuoteStatus) {
    const where = status ? { status } : {};
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.quote.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { customer: true } }),
      this.prisma.quote.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 } };
  }

  async updateStatus(id: string, status: QuoteStatus, estimatedCost?: number) {
    return this.prisma.quote.update({ where: { id }, data: { status, estimatedCost }, include: { customer: true } });
  }
}
