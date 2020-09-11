// import UserService from './UserService';
import { User } from '@boydee/commons';
import { getModelForClass } from '@typegoose/typegoose';
import service from 'feathers-mongoose';

import { Application } from '@/declarations';

export default (app: Application): void => {
  const userModel = getModelForClass(User);

  const userService = service({
    Model: userModel,
    paginate: app.get('paginate'),
  });

  app.use('user', userService);
};
