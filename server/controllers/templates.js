
/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , request = require('request')

/**
 * Show
 */

exports.show = function(req, res) {
    var template = req.params[0];
    res.render('templates/' + template)
}

exports.showContract = function(req, res) {
    var contract = req.params[0]
      , template = req.params[1]

    var Contract = mongoose.model('Contract')
    Contract.findOne({_id: contract}, function(err, data) {
	if (err) res.send(404)
	request('http://localhost:' + data.port + "/" + req.lang + "/templates/" + template, function(err, response, body) {
	    if (err) {
		console.error(err)
		res.status(404).render('404')
	    }
	    res.send(body);
	})
    })
}
