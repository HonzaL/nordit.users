
/**
 * Example Config file
 */

var path = require('path')
  , rootPath = path.normalize(__dirname + '/../..')
  , serverPath = path.normalize(__dirname + '/..')
  , sharePath = path.normalize(__dirname + '/../../share')
  , clientPath = path.normalize(__dirname + '/../../client')

module.exports = {
    default: {
	db: {
	    mongo: 'mongodb://localhost/example',
	    postgres: 'postgres://postgres:postgres@localhost/example',
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
	    name: 'Example Application Name'
	},
    },
    development: {
	db: {
	    mongo: 'mongodb://localhost/example_dev',
	    postgres: 'postgres://postgres:postgres@localhost/example_dev',
	    redis: '192.168.0.10',
	},
    },
    test: {
	db: {
	    mongo: 'mongodb://localhost/example_test',
	},
	port: 8091,
	app: {
	    name: 'Example Application Name - test'
	},
    },
}
