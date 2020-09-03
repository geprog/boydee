import { ServiceMethods } from '@feathersjs/feathers';

import { Reservation } from '@/entities';

export type IReservationService = ServiceMethods<Reservation>;
