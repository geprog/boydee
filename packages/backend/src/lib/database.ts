import mongoose from 'mongoose';

import { Application } from '@/declarations';
import Debug from '@/lib/debug';
import logger from '@/lib/logger';

const debug = Debug('database');

export function init(app: Application): void {
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
}

export async function connect(app: Application): Promise<void> {
  app.set('db-connected', false);

  const dbconfig = app.get('database');

  const connectionString = `mongodb://${dbconfig.host}:${dbconfig.port}/${dbconfig.database}`;

  debug(`connection string: ${connectionString}`);

  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { user: dbconfig.username, password: dbconfig.password },
    authSource: 'admin',
  });

  logger.info('Connected to database');
  app.set('db-connected', true);
  app.emit('db-connected');
}
