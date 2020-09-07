import { prop } from '@typegoose/typegoose';

export class User {
  @prop()
  oauthId: string;

  @prop()
  name: string;

  @prop()
  email: string;

  constructor(oauthId: string, name: string, email: string) {
    this.oauthId = oauthId;
    this.name = name;
    this.email = email;
  }
}
