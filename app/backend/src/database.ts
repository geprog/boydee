import { connect } from 'mongoose';

import { Application } from './declarations';
import Debug from './lib/debug';
// import logger from './logger';

const debug = Debug('database');

// const RECONNECT_TIMEOUT = 3 * 1000;

// const openDatabase = async (connectionOptions: ConnectionOptions): Promise<Connection> => {
//   debug(`Create DB connection`, connectionOptions);

//   try {
//     return await createConnection(connectionOptions);
//   } catch (error) {
//     logger.error('Error in opening DB connection!', error);
//     debug(`Trying to connect again in 3s`);

//     await new Promise((resolve) => setTimeout(resolve, RECONNECT_TIMEOUT));

//     return openDatabase(connectionOptions);
//   }
// };

export default async (app: Application): Promise<void> => {
  const dbconfig = app.get('database');

  // create a typeorm connection
  app.set('db-connected', false);
  const connectionString = `mongodb://${dbconfig.host}:${dbconfig.port}/${dbconfig.database}`;
  debug(`connection string: ${connectionString}`);
  await connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { user: dbconfig.username, password: dbconfig.password },
    authSource: 'admin',
  });

  // mongoose.Promise = global.Promise;

  debug('Successfully connected to database');
  app.set('db-connected', true);
  app.emit('db-connected');
};
