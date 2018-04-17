const bcrypt = require('bcrypt');

module.exports.verifyPassword = (password, digest) => bcrypt.compare(password, digest);

module.exports.hashPassword = (password) => bcrypt.hash(password, 8);
