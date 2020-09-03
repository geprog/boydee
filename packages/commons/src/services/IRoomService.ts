import { ServiceMethods } from '@feathersjs/feathers';

import { Room } from '@/entities';

export type IRoomService = ServiceMethods<Room>;
