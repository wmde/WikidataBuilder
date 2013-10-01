'use strict';

function CleanTask(appConfig) {
	this._appConfig = appConfig;
}

CleanTask.prototype.run = function(log, done) {
	var exec = require('child_process').exec;

	exec(
		'rm -rf ' + this._appConfig.BUILD_DIR,
		function(error, stdout, stderr) {
			done(error===null);

			if (stdout !== '') {
				log(stdout);
			}

			if (stderr !== '') {
				log(stderr);
			}
		}
	);
};

module.exports = CleanTask;