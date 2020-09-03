import { Reservation } from '@boydee/commons';
import { getModelForClass } from '@typegoose/typegoose';
import service from 'feathers-mongoose';

import { Application } from '@/declarations';

export default (app: Application): void => {
  const reservationModel = getModelForClass(Reservation);

  // Initialize our service with any options it requires
  app.use('reservation', service({ Model: reservationModel }));
};
