import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../repository/post.repository';
import { UpdatePostCommand } from '../impl/update-post.command';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler
  implements IInferredCommandHandler<UpdatePostCommand>
{
  constructor(private readonly postRepo: PostRepository) {}

  async execute(command: UpdatePostCommand) {
    const { id, title, content } = command;
    const post = await this.postRepo.findById(id);
    post.title = title ?? post.title;
    post.content = content;
    await this.postRepo.save(post);
    return post;
  }
}
