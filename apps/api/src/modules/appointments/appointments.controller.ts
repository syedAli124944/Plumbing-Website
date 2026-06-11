import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreatePublicAppointmentDto } from './dto/appointment.dto';

@ApiTags('Public')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a booking appointment' })
  async create(@Body() dto: CreatePublicAppointmentDto) {
    const appointment = await this.appointmentsService.createPublic(dto);
    return { success: true, data: appointment, message: 'Appointment booked successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments (Admin)' })
  async findAll() {
    const result = await this.appointmentsService.findAll(1, 50); // Get recent 50
    return { success: true, data: result.data, meta: result.meta };
  }
}
