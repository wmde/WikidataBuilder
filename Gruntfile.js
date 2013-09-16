'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint']);

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			projectBase: {
				src: ['*.js', '*.json']
			}
		},

		watch: {
			all: {
				files: ['**/*.js', '*.json'],
				tasks: ['default']
			},
			projectBase: {
				files: '<%= jshint.projectBase.src %>',
				tasks: ['jshint:projectBase']
			}
		}
	});

	grunt.task.registerTask(
		'build',
		'Build the project',
		function() {
			var done = this.async();

			var exec = require('child_process').exec;
			var composer = exec(
				'php bin/composer.phar install',
				function(error, stdout, stderr) {
					done(error===null);
				}
			);

			composer.stdout.on(
				'data',
				grunt.log.write
			);
		}
	);

};
