import { Application } from '@/declarations';

import HelloService from './hello/hello.service';
import UserService from './user/user.service';
import authentications from './authentication/authentications.service';

export default function (app: Application): void {
  app.configure(HelloService);
  app.configure(UserService);
  app.configure(authentications);
}
