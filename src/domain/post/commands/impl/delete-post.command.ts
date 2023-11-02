import { Command } from '@nestjs-architects/typed-cqrs';
import { PostEntity } from '../../domain/post.entity';

export class DeletePostCommand extends Command<PostEntity> {
  constructor(public readonly id: string) {
    super();
  }
}
