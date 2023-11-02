import { Command } from '@nestjs-architects/typed-cqrs';
import { PostEntity } from '../../domain/post.entity';

export class UpdatePostCommand extends Command<PostEntity> {
  constructor(
    public readonly id: string,
    public readonly title: string | null,
    public readonly content: string | null,
  ) {
    super();
  }
}
