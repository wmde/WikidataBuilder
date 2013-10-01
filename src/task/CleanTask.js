'use strict';

var extend = require('extend');

function CleanTask(appConfig) {
	this._appConfig = appConfig;
}

extend(CleanTask.prototype, {
	'run': function(grunt, done) {
		var exec = require('child_process').exec;

		exec(
			'rm -rf ' + this._appConfig.BUILD_DIR,
			function(error, stdout, stderr) {
				done(error===null);

				if (stdout !== '') {
					grunt.log.writeln(stdout);
				}

				if (stderr !== '') {
					grunt.log.writeln(stderr);
				}
			}
		);
	}
});

module.exports = CleanTask;