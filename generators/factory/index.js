const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'factory',
      message : 'Factory name',
    }, {
      type    : 'input',
      name    : 'table',
      message : 'Table name',
    }]).then(({ factory, table }) => {
      this.temp = { factory, table };
    });
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('factory.js'),
      this.destinationPath(`factories/${this.temp.factory}.js`),
      { 
        factory: this.temp.factory,
        table: this.temp.table,
      }
    );
  }
};
