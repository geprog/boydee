import { Application } from '@/declarations';

import DeskService from './desk.service';
import ReservationService from './reservation.service';
import RoomService from './room.service';
import UserService from './user.service';

export default function (app: Application): void {
  app.configure(DeskService);
  app.configure(ReservationService);
  app.configure(RoomService);
  app.configure(UserService);
}
