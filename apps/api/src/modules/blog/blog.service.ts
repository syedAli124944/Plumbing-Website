import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findPublished(page = 1, limit = 9, category?: string) {
    const where = { isPublished: true, ...(category ? { category } : {}) };
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.blogPost.findMany({ where, skip, take: limit, orderBy: { publishedAt: 'desc' }, select: { id: true, title: true, slug: true, excerpt: true, coverImageUrl: true, category: true, tags: true, readTimeMin: true, publishedAt: true, createdAt: true } }),
      this.prisma.blogPost.count({ where }),
    ]);
    const parsedData = data.map(post => ({ ...post, tags: post.tags ? JSON.parse(post.tags) : [] }));
    return { data: parsedData, meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 } };
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!post) throw new NotFoundException('Blog post not found');
    return { ...post, tags: post.tags ? JSON.parse(post.tags) : [] };
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.blogPost.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.blogPost.count(),
    ]);
    const parsedData = data.map(post => ({ ...post, tags: post.tags ? JSON.parse(post.tags) : [] }));
    return { data: parsedData, meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 } };
  }

  async create(data: { title: string; slug: string; excerpt: string; content: string; category: string; authorId: string; tags: string[]; readTimeMin: number; coverImageUrl?: string; isPublished?: boolean; seoTitle?: string; seoDescription?: string }) {
    const { tags, ...rest } = data;
    const post = await this.prisma.blogPost.create({ data: { ...rest, tags: JSON.stringify(tags || []), publishedAt: rest.isPublished ? new Date() : null } });
    return { ...post, tags: post.tags ? JSON.parse(post.tags) : [] };
  }

  async update(id: string, data: Partial<{ title: string; slug: string; excerpt: string; content: string; category: string; tags: string[]; readTimeMin: number; coverImageUrl: string; isPublished: boolean; seoTitle: string; seoDescription: string }>) {
    const { tags, ...rest } = data;
    const updateData: any = { ...rest, publishedAt: rest.isPublished ? new Date() : undefined };
    if (tags !== undefined) updateData.tags = JSON.stringify(tags);
    const post = await this.prisma.blogPost.update({ where: { id }, data: updateData });
    return { ...post, tags: post.tags ? JSON.parse(post.tags) : [] };
  }

  async remove(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
