import { Reservation } from '@boydee/commons';
import { getModelForClass } from '@typegoose/typegoose';
import service from 'feathers-mongoose';

import { Application } from '@/declarations';

export default (app: Application): void => {
  const reservationModel = getModelForClass(Reservation);

  const reservationService = service({
    Model: reservationModel,
    paginate: app.get('paginate'),
  });

  app.use('reservation', reservationService);
};
