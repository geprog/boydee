import { Application } from '@/declarations';

import UserService from './UserService';

export default (app: Application): void => {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('user', new UserService(options));
};
