const path = require('path');
const glob = require('glob');
const { Factory } = require('rosie');
const knex = require('knex');
const pg = require('pg');
const moment = require('moment')
const config = require('config');
const _ = require('lodash');

const INTERVAL_OID = 1186;
pg.types.setTypeParser(INTERVAL_OID, (val) => {
  return val === null ? null : moment.duration(val)
});

module.exports.knex = (connection) => knex({
  client: 'pg',
  connection: connection || process.env.DATABASE_URL || config.get('knex'),
  useNullAsDefault: true
});

module.exports.auth = require('./auth');

module.exports.createFactory = (database) => {
  glob.sync('*.js', { cwd: path.resolve(__dirname, './factories') })
    .forEach(file => {
      require(path.resolve(__dirname, './factories', file))
        .after((obj, options) => {
          this.create = (props) => database.table(options.tableName)
            .insert({ ...obj }).returning('*')
            .then(result => props ? _.merge(props, result[0]) : result[0])
        });
    });
  return Factory;
}
