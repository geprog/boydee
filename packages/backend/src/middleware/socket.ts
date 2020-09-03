import socketio from '@feathersjs/socketio';

import { Application } from '@/declarations';

const createSocket = () => {
  return socketio({
    path: '/api/v1/socket',
    serveClient: false,
  });
};

export default (app: Application): void => {
  app.configure(createSocket());
};
