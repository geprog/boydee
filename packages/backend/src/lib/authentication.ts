import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { expressOauth, OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';
import { ServiceAddons } from '@feathersjs/feathers';

import { Application } from '@/declarations';

declare module '@/declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<unknown>;
  }
}

class GithubStrategy extends OAuthStrategy {
  // eslint-disable-next-line @typescript-eslint/require-await
  async getEntityQuery(profile: OAuthProfile) {
    return {
      oauthId: `${this.name}-${profile.sub || profile.id}`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
  async getEntityData(profile: OAuthProfile) {
    return {
      oauthId: `${this.name}-${profile.sub || profile.id}`,
      email: profile.email,
      name: profile.name,
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
