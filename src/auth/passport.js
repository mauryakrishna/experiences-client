import passport from 'passport';
import { login as fblogin } from './passport-fb';

/**
 * Sign in with Facebook.
 */
passport.use(fblogin);

export default passport;
