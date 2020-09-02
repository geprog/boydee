import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { ServiceTypes } from '@boydee/commons';
import io from 'socket.io-client';

import { localDebug } from './debug';

const socket = io({
  path: '/api/v1/socket',
  transports: ['websocket'],
});

socket.on('connect', () => {
  localDebug('feathers socket', 'Connected to api ;-)');
});

const feathersClient = feathers<ServiceTypes>().configure(socketio(socket));

export default feathersClient;
