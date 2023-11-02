import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostByIdQuery } from '../impl/post-by-id.query';
import { PostDto } from '../../api/post.dto';
import { PostRepository } from '../../repository/post.repository';

@QueryHandler(PostByIdQuery)
export class PostByIdHandler implements IInferredQueryHandler<PostByIdQuery> {
  constructor(private readonly postRepo: PostRepository) {}
  async execute(query: PostByIdQuery) {
    const post = await this.postRepo.findById(query.id);
    return PostDto.create(post);
  }
}
