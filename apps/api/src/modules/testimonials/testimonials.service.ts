import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  async findPublished() {
    return this.prisma.testimonial.findMany({ where: { isPublished: true, isApproved: true }, orderBy: { createdAt: 'desc' } });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.testimonial.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.testimonial.count(),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 } };
  }

  async approve(id: string) {
    return this.prisma.testimonial.update({ where: { id }, data: { isApproved: true, isPublished: true } });
  }

  async remove(id: string) {
    return this.prisma.testimonial.delete({ where: { id } });
  }
}
