'use strict';

var extend = require('extend');
var WikidataBuilder = require('../WikidataBuilder');
var ConfigResolver = require('../ConfigResolver');
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
		var self = this;

		this._resolveConfig(
			options.buildName,
			function(config) {
				self._createBuild(config, done);
			}
		);
	},

	'_initConfig': function() {
		// TODO
	},

	'_resolveConfig': function(buildName, done) {
		new ConfigResolver(this._appConfig).getConfigForBuild(
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