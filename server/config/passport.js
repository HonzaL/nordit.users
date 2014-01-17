
/**
 * Passport configuration - users server
 */

var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , BearerStrategy = require('passport-http-bearer').Strategy
  , User = mongoose.model('User')

module.exports = function (passport, config) {

    var authConfig = require(config.path.server + "/lib/auth/config")

    authConfig.set(config.authConfig)
    authConfig.setModel(User)

    passport.use(new LocalStrategy(
	function(username, password, done) {
	    User.findOne({username: username}, function(err, user) {
		if (err) { return done(err) }
		if (!user) {
		    return done(null, false, { message: 'Unknown user' })
		}
		user.authenticateByPassword(password, function(err, cookieToken) {
		    if (err) { 
			return done(null, false, { message: 'Invalid password' }); 
		    }
		    return done(null, user, {cookieToken: cookieToken});
		});
	    })
	}
    ))
    passport.use(new BearerStrategy(
	function (token, done) {
	    credentials = new Buffer(token, 'base64').toString('ascii').split('||');
	    // Spatny format authorizacnich dat
	    if (credentials.length != 2) return done(null, false);
	    var username = credentials[0];
	    User.findOne({username: username}, function(err, user) {
		if (err) { return done(err) }
		if (!user) {
		    return done(null, false, { message: 'Unknown user' })
		}
		user.authenticateByToken(credentials[1], function(err, token) {
		    if (err) return done(null, false, {message: 'Invalid cookieToken'});
		    return done(null, user);
		})
	    })
	}
    ))
}
