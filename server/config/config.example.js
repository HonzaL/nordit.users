
/**
 * nbims Config file
 */

var path = require('path')
  , rootPath = path.normalize(__dirname + '/../..')
  , serverPath = path.normalize(__dirname + '/..')
  , sharePath = path.normalize(__dirname + '/../../share')
  , clientPath = path.normalize(__dirname + '/../../client')
  , mongoose = require('mongoose')

module.exports = {
    development: {
	db: {
	    mongo: 'mongodb://localhost/nbims_dev',
	    postgres: 'postgres://postgres:postgres@localhost/nbims_dev',
	    redis: '192.168.0.10',
	},
	path: {
	    root: rootPath,
	    server: serverPath,
	    client: clientPath,
	    share: sharePath
	},
	port: 8090,
	app: {
	    name: 'Nordit Business Intelligence Demo Server - Kompas - dev'
	},
    },
    test: {
	db: {
	    mongo: 'mongodb://localhost/kompas_demo_test',
	},
	path: {
	    root: rootPath,
	    server: serverPath,
	    client: clientPath,
	    share: sharePath
	},
	port: 8091,
	app: {
	    name: 'Nordit Business Intelligence Demo Server - Kompas - test'
	},
    },
    production: {
	db: {
	    mongo: 'mongodb://localhost/kompas_demo',
	    postgres: 'postgres://postgres:postgres@localhost/kompas',
	    redis: '127.0.0.1',
	},
	path: {
	    root: rootPath,
	    server: serverPath,
	    client: clientPath,
	    share: sharePath
	},
	port: 8090,
	app: {
	    name: 'Nordit Business Intelligence Demo Server - Kompas'
	},
    }
}
