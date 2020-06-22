// Minimum TypeScript Version: 3.8
/// <reference types="node" />

// TODO: Remove this file once the types from the PR are published
// Check https://github.com/iaincollins/next-auth/pull/220

declare module "next-auth/adapters" {
  // Minimum TypeScript Version: 3.8

  import type { ConnectionOptions } from 'typeorm';

  /**
   * TODO: type adapters correctly
   * @see https://next-auth.js.org/schemas/adapters
   */
  interface GenericObject {
    [key: string]: any;
  }

  type Adapter = (config: ConnectionOptions) => Promise<GenericObject>;

  interface Adapters {
    Default: Adapter;
    TypeORM: {
      Adapter: Adapter;
      Models: GenericObject;
    };
  }

  declare const Adapters: Adapters;

  export default Adapters;
}

declare module "next-auth/providers" {
  interface Providers {
    Email: Email;
    Credentials: Credentials;
    Apple: Apple;
    Twitter: Twitter;
    Facebook: Facebook;
    GitHub: GitHub;
    Slack: Slack;
    Google: Google;
    Auth0: Auth0;
    IdentityServer4: IdentityServer4;
    Discord: Discord;
    Twitch: Twitch;
    Mixer: Mixer;
    Okta: Okta;
  }
  
  type PossibleProviders =
    | Email
    | Credentials
    | Apple
    | Twitter
    | Facebook
    | GitHub
    | Slack
    | Google
    | Auth0
    | IdentityServer4
    | Discord
    | Twitch
    | Mixer
    | Okta;
  
  declare const Providers: Providers;
  export default Providers;
  export type { PossibleProviders };
  
  /**
   * Email
   */
  type Email = (options: ProviderEmailOptions) => void;
  
  interface ProviderEmailOptions {
    server: string | ProviderEmailServer;
    from: string;
  }
  
  interface ProviderEmailServer {
    host: string;
    port: string;
    auth: ProviderEmailAuth;
  }
  
  interface ProviderEmailAuth {
    user: string;
    pass: string;
  }
  
  /**
   * Credentials
   */
  type Credentials = (options: ProviderCredentialsOptions) => void;
  
  interface ProviderCredentialsOptions {
    authorizes(credentials: ProviderCredentialsObject): Promise<ProviderCredentialsObject>;
  }
  
  interface ProviderCredentialsObject {
    [name: string]: unknown;
  }
  
  /**
   * Apple
   */
  type Apple = (options: ProviderAppleOptions) => void;
  
  interface ProviderAppleOptions {
    clientId: string;
    clientSecret: ProviderAppleSecret;
  }
  
  interface ProviderAppleSecret {
    appleId: string;
    teamId: string;
    privateKey: string;
    keyId: string;
  }
  
  /**
   * Twitter
   */
  type Twitter = (options: ProviderTwitterOptions) => void;
  
  interface ProviderTwitterOptions {
    clientId: string;
    clientSecret: string;
  }
  
  /**
   * Facebook
   */
  type Facebook = (options: ProviderFacebookOptions) => void;
  
  interface ProviderFacebookOptions {
    clientId: string;
    clientSecret: string;
  }
  
  /**
   * GitHub
   */
  type GitHub = (options: ProviderGithubOptions) => void;
  
  interface ProviderGithubOptions {
    clientId: string;
    clientSecret: string;
  }
  
  /**
   * Slack
   */
  type Slack = (options: ProviderSlackOptions) => void;
  
  interface ProviderSlackOptions {
    clientId: string;
    clientSecret: string;
  }
  
  /**
   * Google
   */
  type Google = (options: ProviderGoogleOptions) => void;
  
  interface ProviderGoogleOptions {
    clientId: string;
    clientSecret: string;
  }
  
  /**
   * Auth0
   */
  type Auth0 = (options: ProviderAuth0Options) => void;
  
  interface ProviderAuth0Options {
    clientId: string;
    clientSecret: string;
    subdomain: string;
  }
  
  /**
   * IS4
   */
  
  type IdentityServer4 = (options: ProviderIS4Options) => void;
  
  interface ProviderIS4Options {
    id: 'identity-server4';
    name: 'IdentityServer4';
    scope: string;
    domain: string;
    clientId: string;
    clientSecret: string;
  }
  
  /**
   * Discord
   */
  type Discord = (options: ProviderDiscordOptions) => void;
  
  interface ProviderDiscordOptions {
    clientId: string;
    clientSecret: string;
  }
  
  /**
   * Twitch
   */
  type Twitch = (options: ProviderTwitchOptions) => void;
  
  interface ProviderTwitchOptions {
    clientId: string;
    clientSecret: string;
  }
  
  /**
   * Mixer
   */
  type Mixer = (options: ProviderMixerOptions) => void;
  
  interface ProviderMixerOptions {
    clientId: string;
    clientSecret: string;
  }
  
  /**
   * Okta
   */
  type Okta = (options: ProviderOktaOptions) => void;
  
  interface ProviderOktaOptions {
    clientId: string;
    clientSecret: string;
    domain: string;
  }
}

declare module "next-auth/client" {
  // Minimum TypeScript Version: 3.8
  import { IncomingMessage } from 'http';

  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
    accessToken: string;
    expires: string;
  }

  interface GetProvidersResponse {
    [provider: string]: Provider;
  }

  interface Provider {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
  }

  interface GenericObject {
    [key: string]: any;
  }

  declare function useSession(): [Session, boolean];
  declare function getSession(context: NextContext): Promise<Session | null>;
  declare function session(context: NextContext): Promise<Session | null>;
  declare function getProviders(context: NextContext): Promise<GetProvidersResponse | null>;
  declare function providers(context: NextContext): Promise<GetProvidersResponse | null>;
  declare function getCsrfToken(context: NextContext): Promise<string | null>;
  declare function csrfToken(context: NextContext): Promise<string | null>;
  declare function signin(provider: Provider, data: GenericObject): Promise<void>;
  declare function signout(context: NextContext): Promise<void>;

  export { useSession, getSession, session, getProviders, providers, getCsrfToken, csrfToken, signin, signout };
  export type { Session };

  /**
   * TODO: `dtslint` throws when parsing Next types... the following types are copied directly from `next/types` ...
   * @see https://github.com/microsoft/dtslint/issues/297
   */

  interface Env {
    [key: string]: string;
  }
}

declare module "next-auth" {
  import type { ConnectionOptions } from 'typeorm';
  import type { IncomingMessage, ServerResponse } from 'http';
  import { NextApiRequest, NextApiResponse } from 'next';
  import type { PossibleProviders } from './providers';
  import Adapter from './adapters';
  interface InitOptions {
    site: string;
    providers: PossibleProviders[];
    database?: ConnectionOptions | string;
    secret?: string;
    jwt?: boolean;
    jwtSecret?: string;
    sessionMaxAge?: number;
    sessionUpdateAge?: number;
    verificationMaxAge?: number;
    pages?: PageOptions;
    debug?: boolean;
    basePath?: string;
    callbackUrlHandler?: (url: string, options: CallbackURLOptions) => Promise<void>;
    adapter?: Adapter;
    useSecureCookies?: boolean;
    cookies?: Cookies;
  }

  interface PageOptions {
    signin?: string;
    signout?: string;
    error?: string;
    verifyRequest?: string;
    newUsers?: string | null;
  }

  interface Cookies {
    [cookieKey: string]: Cookie;
  }

  interface Cookie {
    name: string;
    options: CookieOptions;
  }

  interface CookieOptions {
    httpOnly?: boolean;
    // TODO: type available `sameSite` identifiers
    sameSite: 'lax';
    path: string;
    secure: boolean;
  }

  interface CallbackURLOptions {
    site: string;
    defaultCallbackUrl?: string;
    cookies?: Cookies;
    callbacks?: Callbacks;
  }

  interface GenericObject {
    [key: string]: any;
  }

  // TODO: Improve callback typings
  interface Callbacks {
    signin(profile: GenericObject, account: GenericObject, metadata: GenericObject): Promise<void>;
    redirect(url: string, baseUrl: string): Promise<string>;
    session(session: GenericObject, token: GenericObject): Promise<GenericObject>;
    jwt(token: GenericObject, oAuthProfile: GenericObject): Promise<GenericObject>;
  }

  declare function NextAuth(req: NextApiRequest, res: NextApiResponse, options?: InitOptions): Promise<void>;

  export default NextAuth;
  export type { InitOptions, PageOptions };

  interface Env {
    [key: string]: string;
  }

  type Send<T> = (body: T) => void;
}