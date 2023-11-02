import { Command } from '@nestjs-architects/typed-cqrs';
import { UserEntity } from '../../domain/user.entity';

export class UpdateUserCommand extends Command<UserEntity> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string | null,
  ) {
    super();
  }
}
