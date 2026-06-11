import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AppointmentsModule } from '../appointments/appointments.module';
import { QuotesModule } from '../quotes/quotes.module';
import { TestimonialsModule } from '../testimonials/testimonials.module';
import { BlogModule } from '../blog/blog.module';
import { ContactModule } from '../contact/contact.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [AppointmentsModule, QuotesModule, TestimonialsModule, BlogModule, ContactModule, CustomersModule],
  controllers: [AdminController],
})
export class AdminModule {}
