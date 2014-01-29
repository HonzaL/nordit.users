
// Load configurations
var config = require('./server/config/config')['development']

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
	    uglify: {
		files: {
		    'client/scripts/<%= pkg.name %>.min.js': ['client/scripts/<%= pkg.name %>.js'],
		}
	    }
	},
	concat: {
	    options: {
		separator: ';',
	    },
	    client: {
		src: ['client/scripts/application.js', 'client/scripts/router.js', 'client/scripts/controllers.js', 'client/scripts/*/**/*.js'],
		dest: 'client/scripts/<%= pkg.name %>.js'
	    }
	}
    });

    // Load the plugin that provides the "uglify" task
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s)
    grunt.registerTask('default', ['concat:client','uglify:uglify']);
}
