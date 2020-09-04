import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { expressOauth, OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';
import { Params, ServiceAddons } from '@feathersjs/feathers';

import { Application } from '@/declarations';

declare module '@/declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<unknown>;
  }
}

export class GithubStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existing: unknown, params: Params) {
    let baseData = null;
    try {
      baseData = await super.getEntityData(profile, existing, params);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return {
      ...baseData,

      // The user email address (if available)
    };
  }
}

export default function (app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('github', new GithubStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
