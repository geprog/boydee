import { Application } from '@/declarations';

import { HelloService } from './HelloService';

export default (app: Application): void => {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/hello', new HelloService(options, app));
};
