import { Application } from '@/declarations';

import socket from './socket';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (app: Application): void => {
  app.configure(socket);
};
