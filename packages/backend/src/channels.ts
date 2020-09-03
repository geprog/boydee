import '@feathersjs/transport-commons';

import { HookContext } from '@feathersjs/feathers';
import { RealTimeConnection } from '@feathersjs/transport-commons/lib/channels/channel/base';

import { Application } from './declarations';
import { localDebug } from './lib/debug';

export default (app: Application): void => {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection: RealTimeConnection) => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult: unknown, { connection }: { connection: RealTimeConnection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.publish((data: unknown, hook: HookContext) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    localDebug('channels', 'Publishing all events to all authenticated users.');

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  });
};
