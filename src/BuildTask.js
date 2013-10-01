'use strict';

var extend = require('extend');
var WikidataBuilder = require('./WikidataBuilder');
var ConfigResolver = require('./ConfigResolver');

function BuildTask(appConfig) {
	this._appConfig = appConfig;
}

extend(BuildTask.prototype, {
	'run': function(options, done) {
		new ConfigResolver(this._appConfig).getConfigForBuild(
			options.buildName,
			function(config) {
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
		);
	}
});

module.exports = BuildTask;