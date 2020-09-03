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
    const baseData = await super.getEntityData(profile, existing, params);

    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.login,
      // The user email address (if available)
      email: profile.email,
    };
  }
}

export default function (app: Application) {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('github', new GithubStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
