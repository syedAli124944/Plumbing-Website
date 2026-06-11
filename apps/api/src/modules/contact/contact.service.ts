import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateContactDto, CreateServiceRequestDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createMessage(dto: CreateContactDto) {
    return this.prisma.contactMessage.create({ data: dto });
  }

  async createServiceRequest(dto: CreateServiceRequestDto & { isEmergency?: boolean }) {
    return this.prisma.serviceRequest.create({ data: { ...dto, isEmergency: dto.isEmergency ?? false } });
  }

  async findAllMessages(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.contactMessage.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.contactMessage.count(),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 } };
  }

  async markAsRead(id: string) {
    return this.prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
  }
}
