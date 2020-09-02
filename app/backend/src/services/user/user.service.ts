// import UserService from './UserService';
import { User } from '@boydee/commons';
import { getModelForClass } from '@typegoose/typegoose';
import service from 'feathers-mongoose';

import { Application } from '@/declarations';

export default (app: Application): void => {
  const userModel = getModelForClass(User);

  // Initialize our service with any options it requires
  app.use('user', service({ Model: userModel }));
};
