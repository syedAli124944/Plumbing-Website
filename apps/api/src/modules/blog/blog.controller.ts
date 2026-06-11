import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BlogService } from './blog.service';

@ApiTags('Public')
@Controller('blog/posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ApiOperation({ summary: 'Get published blog posts' })
  async findPublished(@Query('page') page = 1, @Query('limit') limit = 9, @Query('category') category?: string) {
    const result = await this.blogService.findPublished(page, limit, category);
    return { success: true, ...result };
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get blog post by slug' })
  async findBySlug(@Param('slug') slug: string) {
    const post = await this.blogService.findBySlug(slug);
    return { success: true, data: post };
  }
}
