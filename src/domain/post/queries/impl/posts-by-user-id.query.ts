import { Query } from '@nestjs-architects/typed-cqrs';
import { PostDto } from '../../api/post.dto';

export class PostsByUserIdQuery extends Query<PostDto[]> {
  constructor(public readonly userId: string) {
    super();
  }
}
