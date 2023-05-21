import knex from 'knex';
import config from '../config/config';

const knexInstance = knex(config.database);

export default knexInstance;
