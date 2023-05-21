/* eslint-disable import/no-import-module-exports */
import type { Knex } from 'knex';
import dbConfig from './config/config';

const config: { [key: string]: Knex.Config } = {
  development: {
    ...dbConfig.database,
    migrations: {
      tableName: 'migrations',
      directory: `${__dirname}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/database/seeds`,
    },
  },

  production: {
    ...dbConfig.database,
    pool: {
      min: 0,
      max: 8,
    },
  },
};

module.exports = config;
