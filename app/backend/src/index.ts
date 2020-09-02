import app from './app';
import logger from './logger';

const hostname = app.get('host');
const port = app.get('port');
const server = app.listen(port);
const NODE_ENV = process.env.NODE_ENV || 'production';

function shutDown(): void {
  server.close(() => {
    logger.info('Backend stopped');
    process.exit(0);
  });

  // wait 3 seconds to kill server
  setTimeout(() => {
    logger.error('Could not close server in time, forcefully shutting down');
    process.exit(1);
  }, 3 * 1000);
}

if (process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', (error) => logger.error('Uncaught exception', error));
  process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

server.on('listening', () => logger.info('Backend started on http://%s:%d (%s)', hostname, port, NODE_ENV));
