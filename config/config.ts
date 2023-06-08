import * as dotenv from 'dotenv';
import httpStatus from 'http-status';
import ApiError from '../src/helpers/apiError';

dotenv.config();

const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    appUrl: process.env.APP_URL,
    clientUrl: process.env.CLIENT_URL,
  },
  database: {
    client: 'pg',
    connection: {
      host: process.env.PSQL_HOST || 'localhost',
      user: process.env.PSQL_USER || '',
      password: process.env.PSQL_PASSWORD || '',
      database: process.env.PSQL_DATABASE || '',
      port: Number(process.env.PSQL_PORT) || 5432,
    },
  },
  authProviders: {
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },
};

Object.entries(config.database.connection).forEach(([name, value]) => {
  if (!value)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Missing config value for ${name}`
    );
});

export default config;
