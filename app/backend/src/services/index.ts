import { Application } from '@/declarations';

import DeskService from './desk.service';
import HelloService from './hello/hello.service';
import ReservationService from './reservation.service';
import RoomService from './room.service';
import UserService from './user/user.service';

export default function (app: Application): void {
  app.configure(HelloService);
  app.configure(UserService);
  app.configure(RoomService);
  app.configure(DeskService);
  app.configure(ReservationService);
}
