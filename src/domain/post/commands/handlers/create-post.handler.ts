import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../impl/create-post.command';
import { PostEntity } from '../../domain/post.entity';
import { PostRepository } from '../../repository/post.repository';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
  implements IInferredCommandHandler<CreatePostCommand>
{
  constructor(private readonly postRepo: PostRepository) {}

  async execute(command: CreatePostCommand) {
    const { title, content, authorId } = command;
    const post = PostEntity.create({ title, content, authorId });
    await this.postRepo.save(post);
    return post;
  }
}
