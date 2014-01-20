
/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , request = require('request')
  , qs = require('qs')

/**
 * Main
 */

exports.main = function(req, res) {
    var contract = req.params[0]
      , path = req.params[1]

    var Contract = mongoose.model('Contract')
    Contract.findOne({_id: contract}, function(err, data) {
	if (err) res.send(404)
	var options = {
	    url: 'http://localhost:' + data.port + "/" + req.lang + path,
	    method: req.method
	}
	if ((req.method == 'POST' || req.method == 'PUT') && req.body) {
	    options['body'] = qs.stringify(req.body);
	}

	request(options
	    , function(err, response, body) {
	    if (err) {
		console.error(err)
		res.status(404).render('404')
	    }
	// TODO rozpoznat JSON (a dalsi) type a vracet patricny typ.
	    res.send(response.statusCode, body);
	})
    })
}
