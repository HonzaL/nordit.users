
/**
 * Dependencies
 */
var crypto = require('crypto')
  , filter = require('password-filter')
  , appConfig = require("nconfig")({file: process.cwd() + '/server/config/config'})
  , config = require(appConfig.path.server + '/lib/auth/config')


exports.createSalt = function(systemSalt, userSalt) {
  return systemSalt + '|' + userSalt;
};

exports.createCookieToken = function(passwordPlain, userCookieSalt, cb) {
  var salt = this.createSalt(config.options.systemCookieSalt, userCookieSalt);
  var options = {
    salt: salt,
    iterations: config.options.cookieIterations,
    keylen: config.options.cookieKeylen
  };
  filter(passwordPlain, options, cb);
};

var createStorageToken = function(userStorageSalt, randomString, date) {
  var token = crypto.createHash('sha256')
      .update(config.options.systemStorageSalt)
      .update(userStorageSalt)
      .update(randomString)
      .update(String(date))
      .digest('hex');
  return token;
};

exports.createStorageToken = function(userStorageSalt, date, cb) {
  crypto.randomBytes(config.options.randomBytesSize, function(err, buf) {
    if (err) return cb(err);
    var randomString = buf.toString('hex');
    var randomHash = createStorageToken(userStorageSalt, randomString, date);
    return cb(null, {
      str: randomString,
      hash: randomHash
    })
  });
};

exports.isValidDate = function(expires) {
  var today = Date.now();
  return expires >= today;
};

exports.isValidStorageToken = function(storageToken, userStorageSalt, randomString, date) {
  var result = createStorageToken(userStorageSalt, randomString, date);
  var result = storageToken === result;
  if (!result) return false;
  return this.isValidDate(date);
};

exports.createPassword = function(passwordPlain, userCookieSalt, userPasswordSalt, cb) {
  this.createCookieToken(passwordPlain, userCookieSalt, function(err, cookieToken){
    if (err) return cb(err);
console.log(cookieToken);
    this.createPasswordFromCookieToken(cookieToken, userPasswordSalt, cb)
  }.bind(this));
};

exports.createPasswordFromCookieToken = function(cookieToken, userPasswordSalt, cb) {
  var salt = this.createSalt(config.options.systemPasswordSalt, userPasswordSalt);
  var options = {
    salt: salt,
    iterations: config.options.passwordIterations,
    keylen: config.options.passwordKeylen
  };
  filter(cookieToken, options, cb);
};
