import { Post } from './post';

export class Child {
  id?: number;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  gender?: string;
  profilePicture?: string;
  posts?: Post[];
}
