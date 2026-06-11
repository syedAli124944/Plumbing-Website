import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';

@ApiTags('Public')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'Get published testimonials' })
  async findPublished() {
    const data = await this.testimonialsService.findPublished();
    return { success: true, data };
  }
}
