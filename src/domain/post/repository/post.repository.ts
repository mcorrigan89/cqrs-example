import { Injectable } from '@nestjs/common';
import { PostEntity } from '../domain/post.entity';
import { EventPublisher } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string): Promise<PostEntity> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new Error('Post not found');
    }
    return new PostEntity(post.id, post);
  }

  async findByUserId(userId: string): Promise<PostEntity[]> {
    const posts = await this.prisma.post.findMany({
      where: { authorId: userId },
    });
    return posts.map((post) => new PostEntity(post.id, post));
  }

  async save(post: PostEntity) {
    const postPublisher = this.eventPublisher.mergeObjectContext(post);
    await this.prisma.post.upsert({
      where: { id: post.id },
      create: {
        id: post.id,
        title: post.title,
        content: post.content,
        author: { connect: { id: post.authorId } },
      },
      update: { title: post.title, content: post.content },
    });
    postPublisher.commit();
    return Promise.resolve(postPublisher);
  }

  async delete(post: PostEntity) {
    const postPublisher = this.eventPublisher.mergeObjectContext(post);
    await this.prisma.post.delete({
      where: { id: post.id },
    });
    postPublisher.commit();
    return Promise.resolve(postPublisher);
  }
}
