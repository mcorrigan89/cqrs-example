import { Query, Args, Resolver } from '@nestjs/graphql';
import { PostDto } from './post.dto';
import { QueryBus } from '@nestjs/cqrs';
import { PostByIdQuery } from '../queries/impl/post-by-id.query';

@Resolver()
export class PostQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}
  @Query(() => PostDto)
  async postById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PostDto> {
    return this.queryBus.execute(new PostByIdQuery(id));
  }
}
