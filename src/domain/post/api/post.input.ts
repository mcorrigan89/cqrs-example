import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field(() => String)
  authorId: string;
}

@InputType()
export class UpdatePostInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  title: string | null;

  @Field(() => String, { nullable: true })
  content: string | null;
}
