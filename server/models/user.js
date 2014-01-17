
/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , generateHash = require('mongoose-hash')
  , config = require("nconfig")({file: process.cwd() + '/server/config/config'})
  , password = require(config.path.server + '/lib/auth/plugins/password')
  , crypt = require(config.path.server + '/lib/auth/crypt')

/**
 * User schema
 */

var UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: {type: String, required: true},
    email: String,
    cookieTokenSalt: {type: String, required: true},
    storageTokenSalt: {type: String, required: true},
    passwordSalt: {type: String, required: true},
    password: {type: String, required: true},
}, {collection: 'user'})

UserSchema.plugin(generateHash, {
    field: 'cookieTokenSalt',
    size: 64
});
UserSchema.plugin(generateHash, {
    field: 'storageTokenSalt',
    size: 64
});
UserSchema.plugin(generateHash, {
    field: 'passwordSalt',
    size: 64
});
UserSchema.plugin(password, {
    field: 'password'
});

UserSchema.methods.authenticateByPassword = function(password, cb) {
    var _self = this;
    crypt.createCookieToken(password, this.cookieTokenSalt, function(err, cookieToken) {
	if (err) return next(err);
	_self.authenticateByToken(cookieToken, cb);
    })
}

UserSchema.methods.authenticateByToken = function(token, cb) {
    var _self = this;
    crypt.createPasswordFromCookieToken(token, this.passwordSalt, function(err, hash){
        if (err) return next(err);
        if (_self.password === hash) {
	    cb(null, token);
        } else {
	    cb({error: "Invalid username/password"}, null);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);
