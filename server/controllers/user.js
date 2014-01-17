


var mongoose = require('mongoose')
  , User = mongoose.model('User')

/**
 * POST /users
 *
 * @param {ServerRequest} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
exports.create = function(req, res, next) {
    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err, user) {
	if (err) return next(err);
	console.log(user);
	res.send(201);
    })
}
