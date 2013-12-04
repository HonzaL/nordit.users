#!/usr/bin/env node
// nbims - Nordit Business Intelligence Demo Server - Kompas

/**
 * Module Dependencies - nbims
 */
var express = require('express')
  , resource = require('express-resource')
  , fs = require('fs')
  , passport = require('passport')

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./server/config/config')[env]
  , mongoose = require('mongoose')

// Bootstrap db connection
mongoose.connect(config.db.mongo)

// Bootstrap models
var models_path = config.path.server + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  console.log(models_path + '/' + file)
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// Setup contract
var setup = require(config.path.server + '/config/setup')(config)

// bootstrap passport config
require(config.path.server + '/config/passport')(passport, config)

var app = express()

//require('./config/api')(app)

// Bootstrap i18n
require(config.path.server + '/config/i18n')(app, config)

require(config.path.server + '/config/express')(app, config, passport)
require(config.path.server + '/config/api')(app, config)

// Bootstrap routes
require(config.path.server + '/config/routes')(app, config, passport)

console.log('Start Application');

process.on('SIGINT', function() {
  console.log("\n"+'Suspend Application');
  // Shutdown script
  var shutdown = require(config.path.server + '/config/shutdown')(config, function() {
    process.kill(process.pid);
  });
});

// Start the app by listening on <port>
var port = process.env.PORT || config.port || 3000
app.listen(port);
console.log('Express app started on port ' + port)

module.exports = app
