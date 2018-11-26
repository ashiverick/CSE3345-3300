import { Post } from './post';

export class Child {
  id?: number;
  name?: string;
  profilePicture?: string;
  posts: Post[];
}
