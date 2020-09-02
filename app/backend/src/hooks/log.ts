// A hook that logs service method before, after and error
import { HookContext } from '@feathersjs/feathers';

import logger from '@/logger';
// TODO: add sentry logging
// import sentry from '../libs/sentry';

export function log(hook: HookContext): void {
  let message = `${hook.type} "${hook.path}/${hook.method}"`;

  if (hook.type === 'after' && hook.id) {
    message += `: ${hook.id}`;
  }

  if (hook.params.provider) {
    message += ` (${hook.params.provider})`;
  }

  if (hook.type === 'error') {
    message += `: ${hook.error.message}`;
  }

  if (hook.params.provider) {
    logger.info(message);
  } else {
    logger.debug(message);
  }

  logger.debug('hook.data', hook.data);
  logger.debug('hook.params', hook.params);

  if (hook.result) {
    logger.debug('hook.result', hook.result);
  }

  // only log client errors (error code is set)
  if (hook.error && !hook.error.code) {
    logger.error(hook.error);
    // sentry.log(hook);
  }
}
