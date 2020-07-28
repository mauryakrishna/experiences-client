import { Strategy as FacebookStrategy } from 'passport-facebook';
import config from '../config';

const facebookOptionsLogin = {
  clientID: config.auth.facebook.id,
  clientSecret: config.auth.facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
};

const facebookCallback = (req, accessToken, refreshToken, profile, done) => {
  // eslint-disable-next-line no-underscore-dangle
  // const { displayname, email } = profile._json;
  // fetch('http://localhost:4000/gql', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     query: '',
  //     variables: { input: { displayname, email } },
  //   }),
  // }).then(res => {
  //   console.log('fetch respnse', res);
  // });
  console.log('req', req.user, profile);
  done(null, req.user);
};

const login = new FacebookStrategy(facebookOptionsLogin, facebookCallback);

export { login };
