import { Controller, Get, Patch, Delete, Param, Query, Body, UseGuards, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards';
import { PrismaService } from '../../database/prisma.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { QuotesService } from '../quotes/quotes.service';
import { TestimonialsService } from '../testimonials/testimonials.service';
import { BlogService } from '../blog/blog.service';
import { ContactService } from '../contact/contact.service';
import { CustomersService } from '../customers/customers.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentStatus } from '../appointments/dto/appointment.dto';
import { QuoteStatus } from '../quotes/quotes.service';

@ApiTags('Admin')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private prisma: PrismaService,
    private appointmentsService: AppointmentsService,
    private quotesService: QuotesService,
    private testimonialsService: TestimonialsService,
    private blogService: BlogService,
    private contactService: ContactService,
    private customersService: CustomersService,
  ) {}

  @Get('dashboard/stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  async getStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [totalCustomers, totalAppointments, pendingQuotes, unreadMessages, monthlyAppointments, completedThisMonth, testimonials] = await Promise.all([
      this.prisma.customer.count(),
      this.prisma.appointment.count(),
      this.prisma.quote.count({ where: { status: 'NEW' } }),
      this.prisma.contactMessage.count({ where: { isRead: false } }),
      this.prisma.appointment.count({ where: { scheduledAt: { gte: startOfMonth } } }),
      this.prisma.appointment.count({ where: { status: 'COMPLETED', updatedAt: { gte: startOfMonth } } }),
      this.prisma.testimonial.aggregate({ _avg: { rating: true } }),
    ]);
    return {
      success: true,
      data: { totalCustomers, totalAppointments, pendingQuotes, unreadMessages, monthlyAppointments, completedThisMonth, revenueEstimate: completedThisMonth * 350, averageRating: testimonials._avg.rating ?? 4.9 },
    };
  }

  // Appointments CRUD
  @Get('appointments')
  async getAppointments(@Query('page') page = 1, @Query('limit') limit = 10, @Query('status') status?: AppointmentStatus) {
    const result = await this.appointmentsService.findAll(page, limit, status);
    return { success: true, ...result };
  }

  @Post('appointments')
  async createAppointment(@Body() dto: CreateAppointmentDto) {
    const appt = await this.appointmentsService.create(dto);
    return { success: true, data: appt };
  }

  @Patch('appointments/:id')
  async updateAppointment(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    const appt = await this.appointmentsService.update(id, dto);
    return { success: true, data: appt };
  }

  @Delete('appointments/:id')
  async deleteAppointment(@Param('id') id: string) {
    await this.appointmentsService.remove(id);
    return { success: true, message: 'Appointment deleted' };
  }

  // Quotes
  @Get('quotes')
  async getQuotes(@Query('page') page = 1, @Query('limit') limit = 10, @Query('status') status?: QuoteStatus) {
    const result = await this.quotesService.findAll(page, limit, status);
    return { success: true, ...result };
  }

  @Patch('quotes/:id')
  async updateQuote(@Param('id') id: string, @Body() body: { status: QuoteStatus; estimatedCost?: number }) {
    const quote = await this.quotesService.updateStatus(id, body.status, body.estimatedCost);
    return { success: true, data: quote };
  }

  // Customers
  @Get('customers')
  async getCustomers(@Query('page') page = 1, @Query('limit') limit = 10) {
    const result = await this.customersService.findAll(page, limit);
    return { success: true, ...result };
  }

  @Get('customers/:id')
  async getCustomer(@Param('id') id: string) {
    const customer = await this.customersService.findById(id);
    return { success: true, data: customer };
  }

  // Testimonials
  @Get('testimonials')
  async getTestimonials(@Query('page') page = 1, @Query('limit') limit = 10) {
    const result = await this.testimonialsService.findAll(page, limit);
    return { success: true, ...result };
  }

  @Patch('testimonials/:id/approve')
  async approveTestimonial(@Param('id') id: string) {
    const testimonial = await this.testimonialsService.approve(id);
    return { success: true, data: testimonial };
  }

  @Delete('testimonials/:id')
  async deleteTestimonial(@Param('id') id: string) {
    await this.testimonialsService.remove(id);
    return { success: true, message: 'Testimonial deleted' };
  }

  // Blog
  @Post('blog/posts')
  async createPost(@Body() body: { title: string; slug: string; excerpt: string; content: string; category: string; authorId: string; tags: string[]; readTimeMin: number; coverImageUrl?: string; isPublished?: boolean; seoTitle?: string; seoDescription?: string }) {
    const post = await this.blogService.create(body);
    return { success: true, data: post };
  }

  @Patch('blog/posts/:id')
  async updatePost(@Param('id') id: string, @Body() body: Partial<{ title: string; slug: string; excerpt: string; content: string; category: string; tags: string[]; readTimeMin: number; coverImageUrl: string; isPublished: boolean; seoTitle: string; seoDescription: string }>) {
    const post = await this.blogService.update(id, body);
    return { success: true, data: post };
  }

  @Delete('blog/posts/:id')
  async deletePost(@Param('id') id: string) {
    await this.blogService.remove(id);
    return { success: true, message: 'Post deleted' };
  }

  // Messages
  @Get('messages')
  async getMessages(@Query('page') page = 1, @Query('limit') limit = 10) {
    const result = await this.contactService.findAllMessages(page, limit);
    return { success: true, ...result };
  }

  @Patch('messages/:id/read')
  async markMessageRead(@Param('id') id: string) {
    const message = await this.contactService.markAsRead(id);
    return { success: true, data: message };
  }
}
