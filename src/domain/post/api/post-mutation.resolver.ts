import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { PostDto } from './post.dto';
import { CreatePostInput, UpdatePostInput } from './post.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PostByIdQuery } from '../queries/impl/post-by-id.query';
import { CreatePostCommand } from '../commands/impl/create-post.command';
import { UpdatePostCommand } from '../commands/impl/update-post.command';
import { DeletePostCommand } from '../commands/impl/delete-post.command';

@Resolver()
export class PostMutationResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => PostDto)
  async createPost(@Args('payload') payload: CreatePostInput) {
    const post = await this.commandBus.execute(
      new CreatePostCommand(payload.title, payload.content, payload.authorId),
    );
    return this.queryBus.execute(new PostByIdQuery(post.id));
  }

  @Mutation(() => PostDto)
  async updatePost(@Args('payload') payload: UpdatePostInput) {
    const post = await this.commandBus.execute(
      new UpdatePostCommand(payload.id, payload.title, payload.content),
    );
    return this.queryBus.execute(new PostByIdQuery(post.id));
  }

  @Mutation(() => String)
  async deletePost(@Args('id') id: string) {
    const post = await this.commandBus.execute(new DeletePostCommand(id));
    return `Deleted Post ${post.id}`;
  }
}
