import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './user.input';
import { UserDto } from './user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserByIdQuery } from '../queries/impl/user-by-id.query';
import { CreateUserCommand } from '../commands/impl/create-user.command';

@Resolver()
export class UserMutationResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => UserDto)
  async createUser(@Args('payload') payload: CreateUserInput) {
    const { id } = await this.commandBus.execute(
      new CreateUserCommand(payload.name, payload.email),
    );
    const userDto = await this.queryBus.execute(new UserByIdQuery(id));
    return userDto;
  }
}
