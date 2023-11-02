import { Query } from '@nestjs-architects/typed-cqrs';
import { UserDto } from '../../api/user.dto';

export class UserByIdQuery extends Query<UserDto> {
  constructor(public readonly id: string) {
    super();
  }
}
