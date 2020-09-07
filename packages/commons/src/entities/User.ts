import { prop } from '@typegoose/typegoose';

export class User {
  @prop()
  githubId: string;

  @prop()
  name: string;

  @prop()
  email: string;

  constructor(githubId: string, name: string, email: string) {
    this.githubId = githubId;
    this.name = name;
    this.email = email;
  }
}
