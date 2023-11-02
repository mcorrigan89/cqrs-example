import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostRepository } from './repository/post.repository';
import { PostQueryResolver } from './api/post-query.resolver';
import { PostQueries } from './queries/post.queries';
import { PostCommands } from './commands/post.commands';
import { PostMutationResolver } from './api/post-mutation.resolver';
import { PostDtoResolver } from './api/post.dto';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [
    ...PostQueries,
    ...PostCommands,
    PostRepository,
    PostQueryResolver,
    PostMutationResolver,
    PostDtoResolver,
  ],
})
export class PostModule {}
