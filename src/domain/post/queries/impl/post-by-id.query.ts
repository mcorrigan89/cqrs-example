import { Query } from '@nestjs-architects/typed-cqrs';
import { PostDto } from '../../api/post.dto';

export class PostByIdQuery extends Query<PostDto> {
  constructor(public readonly id: string) {
    super();
  }
}
