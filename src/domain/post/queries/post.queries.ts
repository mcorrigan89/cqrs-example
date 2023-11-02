import { PostByIdHandler } from './handlers/post-by-id.handler';
import { PostsByUserIdHandler } from './handlers/posts-by-user-id.handler';

export const PostQueries = [PostByIdHandler, PostsByUserIdHandler];
