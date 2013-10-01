'use strict';

var extend = require('extend');
var WikidataBuilder = require('../WikidataBuilder');
var ConfigResolver = require('../ConfigResolver');

function BuildTask(appConfig) {
	this._appConfig = appConfig;
}

extend(BuildTask.prototype, {
	/**
	 * Options accepts:
	 * - buildName: string, optional
	 * - packageName: string, optional
	 * - packageVersion: string, optional
	 */
	'run': function(options, done) {
		var self = this;

		this._resolveConfig(
			options.buildName,
			function(config) {
				self._createBuild(config, done);
			}
		);
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