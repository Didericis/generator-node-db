const Generator = require('yeoman-generator');
const _ = require('lodash');
const path = require('path');
const username = require('username');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: true });
  }
  prompting() {
    return username().then(user => 
      this.prompt([{
        type    : 'input',
        name    : 'folder',
        message : 'Folder name',
        default : `${_.snakeCase(this.options.appname)}`, 
      }, {
        type    : 'input',
        name    : 'dev_db',
        message : 'Development database name',
        default : `${_.snakeCase(this.options.appname)}_development`, 
      }, {
        type    : 'input',
        name    : 'test_db',
        message : 'Test database name',
        default : `${_.snakeCase(this.options.appname)}_test`, 
      }, {
        type    : 'input',
        name    : 'dev_db_user',
        message : 'Development database user',
        default : user,
      }, {
        type    : 'input',
        name    : 'test_db_user',
        message : 'Test database user',
        default : user,
      }]).then((answers) => {
        this.destinationRoot(path.join(process.cwd(), answers.folder));
        this.config.set('dev_db', answers.dev_db);
        this.config.set('test_db', answers.test_db);
        this.config.set('dev_db_user', answers.dev_db_user);
        this.config.set('test_db_user', answers.test_db_user);
      })
    );
  }
  writing() {
    [
      'config/custom-environment-variables.json', 
      'config/development.json', 
      'config/test.json',
      'Dockerfile',
      'package.json',
      'database.json',
      'index.js',
      '.gitignore',
      'README.md',
      'auth.js'
    ].forEach(name => {
      this.fs.copyTpl(
        this.templatePath(name),
        this.destinationPath(name),
        { 
          appname: this.appname,
          dev_db: this.config.get('dev_db'),
          test_db: this.config.get('test_db'),
          dev_db_user: this.config.get('dev_db_user'),
          test_db_user: this.config.get('test_db_user'),
        }
      );
    });
    this.fs.write(this.destinationPath('factories/.keep'), '');
    this.fs.write(this.destinationPath('migrations/.keep'), '');
  }
  install() {
    this.npmInstall([
      'db-migrate', 
      'db-migrate-pg', 
      'bcrypt', 
      'glob', 
      'rosie', 
      'knex', 
      'pg', 
      'moment',
      'faker',
      'config'
    ]);
  }
};
