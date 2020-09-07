import { Service } from '@feathersjs/feathers';

import feathersClient, { BaseModel, makeServicePlugin } from '@/lib/feathers';

class Desk extends BaseModel {
  static modelName = 'Desk';
}

const servicePath = 'desk';

const servicePlugin = makeServicePlugin({
  Model: Desk,
  service: feathersClient.service(servicePath) as Service<unknown>,
  servicePath,
});

export default servicePlugin;
