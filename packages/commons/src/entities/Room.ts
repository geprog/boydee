import { prop } from '@typegoose/typegoose';
export class Room {
  @prop()
  svg: string;

  constructor(svg: string) {
    this.svg = svg;
  }
}
