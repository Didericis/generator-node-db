const Faker = require('faker');
const { Factory } = require('rosie');

module.exports = Factory
  .define('<%= factory %>')
  .options('tableName', '<%= table %>')
  .attrs({
  });
