import { prop } from '@typegoose/typegoose';
export class User {
  @prop()
  firstName: string;

  @prop()
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
