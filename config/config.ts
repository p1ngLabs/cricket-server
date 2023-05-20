import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
  },
};

export default config;
