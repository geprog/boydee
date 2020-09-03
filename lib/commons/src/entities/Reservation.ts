import { mongoose, prop, Ref } from '@typegoose/typegoose';

import { Desk } from './Desk';

export class Reservation {
  @prop({ ref: Desk, type: mongoose.Schema.Types.ObjectId })
  desk: Ref<Desk>;

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
