import fs from 'node:fs';
import path from 'node:path';
import expressSession, { SessionOptions } from 'express-session';
import store from 'connect-pg-simple';
import config from '../config/config';

const PgStore = store(expressSession);

const sessionOptions: SessionOptions = {
  secret: fs.readFileSync(path.join(__dirname, '../secret.key')).toString(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // later set to true in prod
    maxAge: 30 * 60 * 1000, // 30 mins
  },
  store: new PgStore({
    conObject: config.database.connection,
    tableName: 'session',
  }),
};

export default sessionOptions;
