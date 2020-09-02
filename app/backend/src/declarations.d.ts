import { ServiceTypes } from '@boydee/commons';
import { Application as ExpressFeathers } from '@feathersjs/express';

// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes>;
