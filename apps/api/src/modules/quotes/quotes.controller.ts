import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/quote.dto';

@ApiTags('Public')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a quote request' })
  async create(@Body() dto: CreateQuoteDto) {
    const quote = await this.quotesService.create(dto);
    return { success: true, data: quote, message: 'Quote request submitted successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all quotes (Admin)' })
  async findAll() {
    const result = await this.quotesService.findAll(1, 50); // Get recent 50
    return { success: true, data: result.data, meta: result.meta };
  }
}
