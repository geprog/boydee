import { GeneralError } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export function error(ctx: HookContext): HookContext {
  if (ctx.error) {
    const { error } = ctx;

    // only show specified errors
    if (!error.code) {
      const newError = new GeneralError('Server error');
      ctx.error = newError;
      return ctx;
    }

    // hide stack on 404 and in production mode
    if (error.code === 404 || process.env.NODE_ENV === 'production') {
      error.stack = null;
    }
  }

  return ctx;
}
