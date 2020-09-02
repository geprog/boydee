import { Application as ExpressFeathers } from '@feathersjs/express';
import { ServiceTypes } from '@boydee/commons';

// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes>;
