import { AuthenticationService } from '@feathersjs/authentication';
import { OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';
import { Params, ServiceAddons } from '@feathersjs/feathers';

declare module '@/declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<unknown>;
  }
}

export class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existing: unknown, params: Params) {
    const baseData = await super.getEntityData(profile, existing, params);

    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.login,
      // The GitHub profile image
      avatar: profile.avatar_url,
      // The user email address (if available)
      email: profile.email,
    };
  }
}
