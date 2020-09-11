import { Room } from '@boydee/commons';
import { getModelForClass } from '@typegoose/typegoose';
import service from 'feathers-mongoose';

import { Application } from '@/declarations';

export default (app: Application): void => {
  const roomModel = getModelForClass(Room);

  const roomService = service({
    Model: roomModel,
    paginate: app.get('paginate'),
  });

  app.use('room', roomService);
};
