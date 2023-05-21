import type { CorsOptions } from 'cors';
import config from './config';

const whitelist = ['http://localhost:3000', config.app.clientUrl];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default corsOptions;
