import { ServiceTypes } from '@boydee/commons';
import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { discard, iff } from 'feathers-hooks-common';
import feathersVuex from 'feathers-vuex';
import io from 'socket.io-client';

import { localDebug } from './debug';

const socket = io({
  path: '/api/v1/socket',
  transports: ['websocket'],
});

socket.on('connect', () => {
  localDebug('feathers socket', 'Connected to api ;-)');
});

const feathersClient = feathers<ServiceTypes>()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .hooks({
    before: {
      all: [iff((context) => ['create', 'update', 'patch'].includes(context.method), discard('__id', '__isTemp'))],
    },
  });

export default feathersClient;

// Setting up feathers-vuex
// eslint-disable-next-line @typescript-eslint/naming-convention
const { makeServicePlugin, makeAuthPlugin, BaseModel, models, FeathersVuex } = feathersVuex(feathersClient, {
  serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
  idField: '_id', // Must match the id field in your database table/collection
  whitelist: ['$regex', '$options'],
});

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, FeathersVuex };
