import {
  Field,
  ObjectType,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostEntity } from '../domain/post.entity';
import { UserDto } from 'src/domain/user/api/user.dto';
import { QueryBus } from '@nestjs/cqrs';
import { UserByIdQuery } from 'src/domain/user/queries/impl/user-by-id.query';

@ObjectType()
export class PostDto {
  constructor(public readonly entity: PostEntity) {}

  static create(entity: PostEntity) {
    return new PostDto(entity);
  }

  @Field(() => String)
  public get id(): string {
    return this.entity.id;
  }

  @Field(() => String)
  public get title(): string {
    return this.entity.title;
  }

  @Field(() => String, { nullable: true })
  public get content(): string | null {
    return this.entity.content;
  }
}

@Resolver(() => PostDto)
export class PostDtoResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @ResolveField(() => UserDto)
  public async author(@Parent() postDto: PostDto): Promise<UserDto> {
    return this.queryBus.execute(new UserByIdQuery(postDto.entity.authorId));
  }
}
