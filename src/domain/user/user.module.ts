import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './repository/user.repository';
import { UserCommands } from './commands/user.commands';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserQueryResolver } from './api/user-query.resolver';
import { UserQueries } from './queries/user.queries';
import { UserMutationResolver } from './api/user-mutation.resolver';
import { UserDtoResolver } from './api/user.dto';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [
    ...UserCommands,
    ...UserQueries,
    UserRepository,
    UserQueryResolver,
    UserMutationResolver,
    UserDtoResolver,
  ],
})
export class UserModule {}
