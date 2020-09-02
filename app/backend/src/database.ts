import * as Domain from '@boydee/commons';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { Application } from './declarations';
import Debug from './lib/debug';
import logger from './logger';

const debug = Debug('database');

const RECONNECT_TIMEOUT = 3 * 1000;

const openDatabase = async (connectionOptions: ConnectionOptions): Promise<Connection> => {
  debug(`Create DB connection`, connectionOptions);

  try {
    return await createConnection(connectionOptions);
  } catch (error) {
    logger.error('Error in opening DB connection!', error);
    debug(`Trying to connect again in 3s`);

    await new Promise((resolve) => setTimeout(resolve, RECONNECT_TIMEOUT));

    return openDatabase(connectionOptions);
  }
};

export default async (app: Application): Promise<Connection> => {
  const dbconfig = app.get('database');
  const entities = [...Object.values(Domain)];
  // read connection options from ormconfig file (or ENV variables)
  const connectionOptions: ConnectionOptions = {
    ...dbconfig,

    // entities & migrations
    entities,
    migrationsRun: true, // run migrations on app start
    migrations: [],
    migrationsTransactionMode: 'each',

    // misc
    synchronize: true, // this should synchronize all definded entities with the db, disables this when using migrations
    logging: false,
  };

  // create a typeorm connection
  app.set('db-connected', false);
  const connection = await openDatabase(connectionOptions);
  debug('Successfully connected to database');
  app.set('db-connected', true);
  app.emit('db-connected');

  return connection;
};
