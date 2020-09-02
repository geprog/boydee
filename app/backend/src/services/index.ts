import { Application } from '@/declarations';

import HelloService from './hello/hello.service';
import UserService from './user/user.service';

export default function (app: Application): void {
  app.configure(HelloService);
  app.configure(UserService);
}
