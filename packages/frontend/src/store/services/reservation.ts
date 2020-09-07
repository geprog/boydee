import { Service } from '@feathersjs/feathers';

import feathersClient, { BaseModel, makeServicePlugin } from '@/lib/feathers';

class Reservation extends BaseModel {
  static modelName = 'Reservation';
}

const servicePath = 'reservation';

const servicePlugin = makeServicePlugin({
  Model: Reservation,
  service: feathersClient.service(servicePath) as Service<unknown>,
  servicePath,
});

export default servicePlugin;
