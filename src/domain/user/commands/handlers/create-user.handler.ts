import { UserRepository } from '../../repository/user.repository';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { UserEntity } from '../../domain/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements IInferredCommandHandler<CreateUserCommand>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const { name, email } = command;
    const user = UserEntity.create({ name, email });
    await this.userRepo.save(user);
    return user;
  }
}
