import { CreatePostHandler } from './handlers/create-post.handler';
import { DeletePostHandler } from './handlers/delete-post.handler';
import { UpdatePostHandler } from './handlers/update-post.handler';

export const PostCommands = [
  CreatePostHandler,
  UpdatePostHandler,
  DeletePostHandler,
];
