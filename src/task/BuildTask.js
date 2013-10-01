'use strict';

var extend = require('extend');
var WikidataBuilder = require('../WikidataBuilder');
var BuildConfigReader = require('../BuildConfigReader');
var ConfigDirCreator = require('../ConfigDirCreator');

function BuildTask(appConfig) {
	this._appConfig = appConfig;
}

extend(BuildTask.prototype, {
	/**
	 * @param options
	 * Options is a map that can hold:
	 * - buildName: string, optional
	 * - packageName: string, optional
	 * - packageVersion: string, optional
	 *
	 * @param log A function that takes a string argument
	 * @param done A callback that takes a boolean success indicator argument
	 */
	'run': function(options, log, done) {
		options.buildName = options.buildName || this._appConfig.DEFAULT_BUILD;

		var self = this;

		this._initConfig(
			options,
			function() {
				self._resolveConfig(
					options.buildName,
					function(config) {
						self._createBuild(config, done);
					}
				);
			}
		);
	},

	'_initConfig': function(options, done) {
		var configCreator = new ConfigDirCreator(this._appConfig.BUILD_CONFIG_DIR);
		configCreator.once("done", done);

		configCreator.create({
			'configName': options.buildName,
			'buildName': options.buildName,
			'packageName': options.packageName,
			'packageVersion': options.packageVersion
		});
	},

	'_resolveConfig': function(buildName, done) {
		new BuildConfigReader(this._appConfig).getConfigForBuild(
			buildName,
			done
		);
	},

	'_createBuild': function(config, done) {
		var builder = new WikidataBuilder(
			config
		);

		builder.once(
			'done',
			function(error) {
				done(error===null);
			}
		);

		builder.build();
	}
});

module.exports = BuildTask;