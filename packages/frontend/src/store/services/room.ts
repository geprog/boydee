import { Service } from '@feathersjs/feathers';

import feathersClient, { BaseModel, makeServicePlugin } from '@/lib/feathers';

class Room extends BaseModel {
  static modelName = 'Room';
}

const servicePath = 'room';

const servicePlugin = makeServicePlugin({
  Model: Room,
  service: feathersClient.service(servicePath) as Service<unknown>,
  servicePath,
});

export default servicePlugin;
