import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../repository/post.repository';
import { DeletePostCommand } from '../impl/delete-post.command';
import { PostDeletedEvent } from '../../domain/post.events';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler
  implements IInferredCommandHandler<DeletePostCommand>
{
  constructor(private readonly postRepo: PostRepository) {}

  async execute(command: DeletePostCommand) {
    const { id } = command;
    const post = await this.postRepo.findById(id);
    post.apply(new PostDeletedEvent(id));
    await this.postRepo.delete(post);
    return post;
  }
}
