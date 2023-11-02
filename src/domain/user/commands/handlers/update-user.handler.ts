import { UserRepository } from '../../repository/user.repository';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements IInferredCommandHandler<UpdateUserCommand>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: UpdateUserCommand) {
    const { name, email } = command;
    const user = await this.userRepo.findById(command.id);
    user.name = name;
    user.email = email;
    await this.userRepo.save(user);
    return user;
  }
}
