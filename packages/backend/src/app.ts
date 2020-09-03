import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import feathers from '@feathersjs/feathers';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import favicon from 'serve-favicon';

import * as database from '@/lib/database';
import logger from '@/lib/logger';

import appHooks from './app.hooks';
import channels from './channels';
import { Application } from './declarations';
import middleware from './middleware';
import services from './services';

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration());

// create a database connection
// TODO: async configuration shall be possible with version 5 (see https://github.com/feathersjs/feathers/issues/1965)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.configure(database.init);

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use(express.static(app.get('public')));

// Set up Plugins and providers
// app.configure(express.rest()); // disable express rest api for now

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

app.get('*', (req, res) => {
  res.sendFile(path.join(app.get('public'), 'index.html'));
});

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

export default app;
