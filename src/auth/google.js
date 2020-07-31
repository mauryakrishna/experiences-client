import { OAuthStrategy as GoogleStrategy } from 'passport-google-oauth';
import config from '../config';
import authcallback from './authcallback';

const OAuthOptions = {
  consumerKey: config.auth.google.id,
  consumerSecret: config.auth.google.secret,
  callbackURL: 'auth/google/return',
  passReqToCallback: true,
};

export default new GoogleStrategy(OAuthOptions, authcallback);
