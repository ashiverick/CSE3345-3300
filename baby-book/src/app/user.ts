import { Child } from './child';

export class User {
  email?: string;
  userName?: string;
  password?: string;
  children: Child[];
}
