import { Desk } from '@boydee/commons';
import { getModelForClass } from '@typegoose/typegoose';
import service from 'feathers-mongoose';

import { Application } from '@/declarations';

export default (app: Application): void => {
  const deskModel = getModelForClass(Desk);

  const deskService = service({
    Model: deskModel,
    paginate: app.get('paginate'),
  });

  app.use('desk', deskService);
};
