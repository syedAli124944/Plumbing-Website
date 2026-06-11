import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      status: 'ok',
      message: 'ProPlumb USA API is running smoothly!',
      version: '1.0'
    };
  }
}
