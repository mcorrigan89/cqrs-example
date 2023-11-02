import { Command } from '@nestjs-architects/typed-cqrs';
import { PostEntity } from '../../domain/post.entity';

export class CreatePostCommand extends Command<PostEntity> {
  constructor(
    public readonly title: string,
    public readonly content: string | null,
    public readonly authorId: string,
  ) {
    super();
  }
}
