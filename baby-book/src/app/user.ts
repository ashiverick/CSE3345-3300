import { Child } from './child';

export class User {
  [x: string]: any;
  email?: string;
  userName?: string;
  password?: string;
  children: Child[];
}
