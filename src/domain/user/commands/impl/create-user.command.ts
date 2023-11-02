import { Command } from '@nestjs-architects/typed-cqrs';
import { UserEntity } from '../../domain/user.entity';

export class CreateUserCommand extends Command<UserEntity> {
  constructor(public readonly name: string, public readonly email: string) {
    super();
  }
}
