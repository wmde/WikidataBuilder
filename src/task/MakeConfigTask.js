'use strict';

var extend = require('extend');

function CleanTask(appConfig) {
	this._appConfig = appConfig;
}

extend(CleanTask.prototype, {
	/**
	 * @param options
	 * Options is a map that can hold:
	 * - buildName: string, required
	 * - packageName: string, optional
	 * - packageVersion: string, optional
	 *
	 * @param done A function called when the task is done
	 */
	'run': function(options, done) {
		var ConfigDirCreator = require('../ConfigDirCreator');
		var dirCreator = new ConfigDirCreator(this._appConfig.BUILD_CONFIG_DIR);

		dirCreator.once('done', function() {
			done();
		});

		dirCreator.create({
			'configName': options.buildName,
			'buildName': options.buildName,
			'packageName': options.packageName,
			'packageVersion': options.packageVersion
		});
	}
});

module.exports = CleanTask;