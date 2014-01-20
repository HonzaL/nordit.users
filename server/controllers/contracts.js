
/**
 * Module dependencies
 */

var mongoose = require('mongoose')
//  , fs = require('fs')
  , request = require('request')

/**
 * Index
 *
 * Vraci vsechny dostupne zakazky
 * TODO - vratit jen dostupne pro daneho uzivatele
 */

exports.index = function(req, res) {
    var Contract = mongoose.model('Contract')
    Contract.find({'active': true}, {'_id': 1, 'title': 1, 'active': 1}, function(err, data) {
	if (err) res.send(404)
	for (var contract in data) {
	    data[contract].id = data[contract]._id;
	}
	res.type('json').send({contract: data})
    })
}

/**
 * Show
 */

exports.show = function(req, res) {
    var contract = req.params.contract || 'main';
    if (contract == 'main') {
	// vracim hlavni modul
	res.type('json').render('contract.ejs');
    } else {
	// info o ostatnich modulech
	var Contract = mongoose.model('Contract')
	Contract.findOne({_id: contract}, function(err, data) {
	    if (err || !data) {
	      res.send('404')
	      return;
	    }
	    // TODO pokdu je POST nebo PUT musme predat i body
	    request({
		url: 'http://localhost:' + data.port + "/" + req.lang + "/api/v1/contracts/" + contract,
		method: req.method
	    }, function(err, response, body) {
		res.type('json')
		res.send(body);
	    })
	})
    }
}
