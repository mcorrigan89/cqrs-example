import { Query, Args, Resolver } from '@nestjs/graphql';
import { UserDto } from './user.dto';
import { QueryBus } from '@nestjs/cqrs';
import { UserByIdQuery } from '../queries/impl/user-by-id.query';

@Resolver()
export class UserQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}
  @Query(() => UserDto)
  async userById(@Args('id', { type: () => String }) id: string) {
    return this.queryBus.execute(new UserByIdQuery(id));
  }
}
