import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserByIdQuery } from '../impl/user-by-id.query';
import { UserDto } from '../../api/user.dto';
import { UserRepository } from '../../repository/user.repository';

@QueryHandler(UserByIdQuery)
export class UserByIdHandler implements IInferredQueryHandler<UserByIdQuery> {
  constructor(private readonly userRepo: UserRepository) {}
  async execute(query: UserByIdQuery) {
    const user = await this.userRepo.findById(query.id);
    return UserDto.create(user);
  }
}
