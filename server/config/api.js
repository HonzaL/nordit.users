
/**
 * Module Dependencies
 */

var express = require('express')
  , resource = require('express-resource')



module.exports = function (app, config, passport) {

    var base = '/api/v1/'

    app.resource('contracts', require(config.path.server + '/controllers/contracts'), {base: base})
    app.resource('users', require(config.path.server + '/controllers/user'), {base: base})

//    app.resource('batch', require('../app/controllers/batch'), {base: base})
//    app.resource('evidence', require('../app/controllers/evidenceReport'), {base: base})
//    app.resource('counter', require('../app/controllers/counter'), {base: base})
//    app.resource('summary', require('../app/controllers/summary'), {base: base})

}
