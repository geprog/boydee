import { mongoose, prop, Ref } from '@typegoose/typegoose';

import { Room } from './Room';

export class Desk {
  @prop({ ref: Room, type: mongoose.Schema.Types.ObjectId })
  room: Ref<Room>;

  constructor(room: Ref<Room>) {
    this.room = room;
  }
}
