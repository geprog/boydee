import { mongoose, prop, Ref } from '@typegoose/typegoose';

import { Desk } from './Desk';
import { User } from './User';

export class Reservation {
  @prop({ ref: Desk, type: mongoose.Schema.Types.ObjectId })
  desk: Ref<Desk>;

  @prop({ ref: User, type: mongoose.Schema.Types.ObjectId })
  client: Ref<User>;

  @prop()
  start: Date;

  @prop()
  end: Date;
  constructor(desk: Ref<Desk>, start: Date, end: Date) {
    this.desk = desk;
    this.start = start;
    this.end = end;
  }
}
