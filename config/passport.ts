import passport from 'passport';
import Local from 'passport-local';
import Google from 'passport-google-oauth20';
import Facebook from 'passport-facebook';
import bcrypt from 'bcryptjs';
import { MaybeCompositeId } from 'objection';
import User from '../src/components/users/user.model';
import config from './config';
import { PassportUser } from '../src/@types/components/user';

const LocalStrategy = Local.Strategy;
const GoogleStrategy = Google.Strategy;
const FacebookStrategy = Facebook.Strategy;

export const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.query().findOne('email', email);
      if (!user) return done(null, false);
      if (!(await bcrypt.compare(password, user.password)))
        return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.authProviders.google.clientId || '',
    clientSecret: config.authProviders.google.clientSecret || '',
    callbackURL: `${config.app.appUrl}/auth/google/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    User.query()
      .findOne('googleId', profile.id)
      .then((user) => {
        if (!user) return done(null, false);
        return done(null, user);
      })
      .catch((err) => done(err));
  }
);

export const facebookStrategy = new FacebookStrategy(
  {
    clientID: config.authProviders.facebook.clientId || '',
    clientSecret: config.authProviders.facebook.clientSecret || '',
    callbackURL: `${config.app.appUrl}/auth/facebook/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    User.query()
      .findOne('facebookId', profile.id)
      .then((user) => {
        if (!user) return done(null, false);
        return done(null, user);
      })
      .catch((err) => done(err));
  }
);

passport.serializeUser((user: PassportUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: MaybeCompositeId, done) => {
  try {
    const user = await User.query().findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default () => {
  passport.use(localStrategy);
  passport.use(googleStrategy);
  passport.use(facebookStrategy);
};
