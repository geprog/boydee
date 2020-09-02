import { IHelloService } from './IHelloService';
import { IUserService } from './IUserService';

export * from './IHelloService';
export * from './IUserService';

export interface ServiceTypes {
  hello: IHelloService;
  user: IUserService;
}
