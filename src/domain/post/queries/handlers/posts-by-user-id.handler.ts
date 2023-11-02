import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostDto } from '../../api/post.dto';
import { PostRepository } from '../../repository/post.repository';
import { PostsByUserIdQuery } from '../impl/posts-by-user-id.query';

@QueryHandler(PostsByUserIdQuery)
export class PostsByUserIdHandler
  implements IInferredQueryHandler<PostsByUserIdQuery>
{
  constructor(private readonly postRepo: PostRepository) {}
  async execute(query: PostsByUserIdQuery) {
    const posts = await this.postRepo.findByUserId(query.userId);
    return posts.map((post) => PostDto.create(post));
  }
}
