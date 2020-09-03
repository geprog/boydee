import { Desk } from '@boydee/commons';
import { getModelForClass } from '@typegoose/typegoose';
import service from 'feathers-mongoose';

import { Application } from '@/declarations';

export default (app: Application): void => {
  const deskModel = getModelForClass(Desk);

  // Initialize our service with any options it requires
  app.use('desk', service({ Model: deskModel }));
};
