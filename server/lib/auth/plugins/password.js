var crypto = require('crypto')
  , env = process.env.NODE_ENV || 'development'
  , config = require("nconfig")({file: process.cwd() + '/server/config/config'})
  , crypt = require(config.path.server + '/lib/auth/crypt')

module.exports = exports = function (schema, options) {
  schema.pre('validate', function (next) {
    var field = options.field || 'password';

    if (typeof this[field] === 'undefined') {
      return next();
    }

    password = this[field];

    if (password === '') {
      return next();
    }

    if (!this.isModified(field)) {
      return next();
    }

    crypt.createPassword(password, this.cookieTokenSalt, this.passwordSalt, function(err, result){
	if (err) return next(err);
	this.password = result;
	return next()
    }.bind(this));
  });
};
