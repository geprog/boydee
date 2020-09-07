import { hooks } from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';

export async function authenticate(hook: HookContext): Promise<HookContext> {
  const { params, path } = hook;

  // skip internal calls
  if (!params.provider) {
    return hook;
  }

  // skip calls to authentication service
  if (`/${path}` === '/authentication') {
    return hook;
  }

  // default checks (authenticated frontend calls)
  await hooks.authenticate('jwt')(hook); // check jwt token
  return hook;
}
