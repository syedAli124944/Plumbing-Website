import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentStatus, CreatePublicAppointmentDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10, status?: AppointmentStatus) {
    const where = status ? { status } : {};
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.appointment.findMany({ where, skip, take: limit, orderBy: { scheduledAt: 'desc' }, include: { customer: true } }),
      this.prisma.appointment.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 } };
  }

  async create(dto: CreateAppointmentDto) {
    return this.prisma.appointment.create({ data: { customerId: dto.customerId, serviceType: dto.serviceType, scheduledAt: new Date(dto.scheduledAt), technicianNote: dto.technicianNote }, include: { customer: true } });
  }

  async createPublic(dto: CreatePublicAppointmentDto) {
    let customer = await this.prisma.customer.findUnique({ where: { email: dto.email } });
    if (!customer) {
      customer = await this.prisma.customer.create({ data: { name: dto.name, email: dto.email, phone: dto.phone, address: dto.address, notes: dto.notes } });
    }
    return this.prisma.appointment.create({
      data: { customerId: customer.id, serviceType: dto.serviceType, scheduledAt: new Date(dto.scheduledAt), technicianNote: dto.notes },
      include: { customer: true },
    });
  }


  async update(id: string, dto: UpdateAppointmentDto) {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return this.prisma.appointment.update({ where: { id }, data: { ...dto, scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined }, include: { customer: true } });
  }

  async remove(id: string) {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return this.prisma.appointment.delete({ where: { id } });
  }
}
