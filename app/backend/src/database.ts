import { connect } from 'mongoose';

import { Application } from './declarations';
import Debug from './lib/debug';

const debug = Debug('database');

export default async (app: Application): Promise<void> => {
  const dbconfig = app.get('database');

  app.set('db-connected', false);
  const connectionString = `mongodb://${dbconfig.host}:${dbconfig.port}/${dbconfig.database}`;
  debug(`connection string: ${connectionString}`);
  await connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { user: dbconfig.username, password: dbconfig.password },
    authSource: 'admin',
  });

  debug('Successfully connected to database');
  app.set('db-connected', true);
  app.emit('db-connected');
};
