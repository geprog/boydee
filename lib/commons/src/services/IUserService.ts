import { ServiceMethods } from '@feathersjs/feathers';

import { User } from '@/entities';

export type IUserService = ServiceMethods<User>;
