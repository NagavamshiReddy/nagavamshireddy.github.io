const knexModule = require('knex');
import { parse } from 'pg-connection-string';
import path from 'path';
import {Config} from '../config/config';
require('dotenv').config();

// Using two static variable with same value but of different types since, knex CLI doesn't accept knex instance config
// and to connect to db other than CLI we need knex type config.
export class KnexObj {
 static knex_config = {
  client: 'pg',
  connection: Object.assign(parse(process.env.DATABASE_URL as string), {ssl: {rejectUnauthorized: false}}),
  searchPath: new Config().getSchemaName(),
  pool: {
   min: 1,
   max: 5,
  },
  migrations: {
   schemaName: new Config().getSchemaName(),
   directory: path.join(__dirname, './migration'),
  },
  seeds: {
   schemaName: new Config().getSchemaName(),
   directory: path.join(__dirname, './seeding'),
  },
  acqireConnectionTimeout: 70000,
 };

 static connection = knexModule(KnexObj.knex_config);

}