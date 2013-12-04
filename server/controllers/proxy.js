
/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , request = require('request')

/**
 * Main
 */

exports.main = function(req, res) {
    var contract = req.params[0]
      , path = req.params[1]

console.log(contract, path);

    var Contract = mongoose.model('Contract')
    Contract.findOne({_id: contract}, function(err, data) {
	if (err) res.send(404)
	// TODO body pro POST a PUT 
	request({
	    url: 'http://localhost:' + data.port + "/" + req.lang + path,
	    method: req.method
	}, function(err, response, body) {
	    if (err) {
		console.error(err)
		res.status(404).render('404')
	    }
	// TODO rozpoznat JSON (a dalsi) type a vracet patricny typ.
	    res.send(body);
	})
    })
}
