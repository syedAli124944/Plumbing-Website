import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto, CreateServiceRequestDto } from './dto/contact.dto';

@ApiTags('Public')
@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('contact')
  @ApiOperation({ summary: 'Submit contact message' })
  async createContact(@Body() dto: CreateContactDto) {
    const message = await this.contactService.createMessage(dto);
    return { success: true, data: message, message: 'Message sent successfully' };
  }

  @Post('service-requests')
  @ApiOperation({ summary: 'Submit emergency service request' })
  async createServiceRequest(@Body() dto: CreateServiceRequestDto) {
    const request = await this.contactService.createServiceRequest({ ...dto, isEmergency: true });
    return { success: true, data: request, message: 'Emergency request submitted' };
  }
}
