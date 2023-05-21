import * as dotenv from 'dotenv';
import httpStatus from 'http-status';
import ApiError from '../src/helpers/apiError';

dotenv.config();

const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
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
};

Object.entries(config.database.connection).forEach(([name, value]) => {
  if (!value)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Missing config value for ${name}`
    );
});

export default config;
