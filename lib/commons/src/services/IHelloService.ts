import { ServiceMethods } from '@feathersjs/feathers';

import { Hello } from '@/Hello';

export type IHelloService = ServiceMethods<Hello>;
