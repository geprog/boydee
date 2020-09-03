import { IDeskService } from './IDeskService';
import { IHelloService } from './IHelloService';
import { IReservationService } from './IReservationService';
import { IRoomService } from './IRoomService';
import { IUserService } from './IUserService';

export * from './IHelloService';
export * from './IUserService';
export * from './IRoomService';
export * from './IDeskService';
export * from './IReservationService';

export interface ServiceTypes {
  hello: IHelloService;
  user: IUserService;
  room: IRoomService;
  desk: IDeskService;
  reservation: IReservationService;
}
