'use strict';

var extend = require('extend');

function CleanTask(appConfig) {
	this._appConfig = appConfig;
}

extend(CleanTask.prototype, {
	'run': function(options, done) {
		var ConfigDirCreator = require('../ConfigDirCreator');
		var dirCreator = new ConfigDirCreator(this._appConfig.BUILD_CONFIG_DIR);

		dirCreator.once('done', function() {
			done();
		});

		dirCreator.create(options.configName);
	}
});

module.exports = CleanTask;