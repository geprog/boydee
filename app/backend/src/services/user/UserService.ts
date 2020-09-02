import { ServiceOptions } from '@feathersjs/adapter-commons';
import { ServiceAddons } from '@feathersjs/feathers';
import { User } from '@boydee/commons';

import SyncTypeORMService from '@/services/SyncTypeORMService';

export default class UserService extends SyncTypeORMService<User> {
  constructor(options: Partial<ServiceOptions> = {}) {
    super(
      Object.assign(
        {
          entitySchema: User,
        },
        options,
      ),
    );
  }

  setup(this: UserService & ServiceAddons<User>): void {
    this.hooks({});
  }
}
