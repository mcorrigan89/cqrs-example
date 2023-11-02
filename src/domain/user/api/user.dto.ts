import {
  Field,
  ObjectType,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserEntity } from '../domain/user.entity';
import { PostDto } from 'src/domain/post/api/post.dto';
import { QueryBus } from '@nestjs/cqrs';
import { PostsByUserIdQuery } from 'src/domain/post/queries/impl/posts-by-user-id.query';

@ObjectType()
export class UserDto {
  constructor(public readonly entity: UserEntity) {}

  static create(entity: UserEntity) {
    return new UserDto(entity);
  }

  @Field(() => String)
  public get id(): string {
    return this.entity.id;
  }

  @Field(() => String)
  public get name(): string {
    return this.entity.name;
  }

  @Field(() => String, { nullable: true })
  public get email(): string | null {
    return this.entity.email;
  }
}

@Resolver(() => UserDto)
export class UserDtoResolver {
  constructor(private queryBus: QueryBus) {}

  @ResolveField(() => [PostDto])
  public async posts(@Parent() userDto: UserDto): Promise<PostDto[]> {
    const posts = await this.queryBus.execute(
      new PostsByUserIdQuery(userDto.id),
    );
    return posts;
  }
}
