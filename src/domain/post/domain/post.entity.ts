import { AggregateRoot } from '@nestjs/cqrs';
import * as crypto from 'node:crypto';
import { PostCreatedEvent } from './post.events';

interface PostProps {
  authorId: string;
  title: string;
  content: string | null;
}

export interface CreatePostArgs {
  authorId: string;
  title: string;
  content: string | null;
}

export class PostEntity extends AggregateRoot {
  constructor(public readonly id: string, private readonly props: PostProps) {
    super();
  }

  static create(args: CreatePostArgs): PostEntity {
    const id = crypto.randomUUID();
    const props: PostProps = { ...args };
    const postEntity = new PostEntity(id, props);
    postEntity.apply(new PostCreatedEvent(id, props.title));
    return postEntity;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get content(): string | null {
    return this.props.content;
  }

  set content(conent: string | null) {
    this.props.content = conent;
  }
}
