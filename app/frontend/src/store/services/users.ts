import { Service } from '@feathersjs/feathers';

import feathersClient, { BaseModel, makeServicePlugin } from '@/lib/feathers';

class User extends BaseModel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any, options: any) {
    super(data, options);
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'User';
  // Define default properties here
  static instanceDefaults() {
    return {
      email: '',
      password: '',
    };
  }
}
const servicePath = 'user';
const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath) as Service<unknown>,
  servicePath,
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

export default servicePlugin;
