import { Room } from '@boydee/commons';
import { getModelForClass } from '@typegoose/typegoose';
import service from 'feathers-mongoose';

import { Application } from '@/declarations';

export default (app: Application): void => {
  const roomModel = getModelForClass(Room);

  // Initialize our service with any options it requires
  app.use('room', service({ Model: roomModel }));
};
