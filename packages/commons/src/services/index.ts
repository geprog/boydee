import { IDeskService } from './IDeskService';
import { IReservationService } from './IReservationService';
import { IRoomService } from './IRoomService';
import { IUserService } from './IUserService';

export * from './IUserService';
export * from './IRoomService';
export * from './IDeskService';
export * from './IReservationService';

export interface ServiceTypes {
  user: IUserService;
  room: IRoomService;
  desk: IDeskService;
  reservation: IReservationService;
}
