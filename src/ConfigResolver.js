'use strict';

var extend = require('extend');
var EventEmitter = require('events').EventEmitter;
var path = require('path');

function ConfigResolver(appConfig) {
	EventEmitter.call(this);

	this._appConfig = appConfig;
}

ConfigResolver.prototype = Object.create(EventEmitter.prototype);
ConfigResolver.prototype.constructor = ConfigResolver;

extend(ConfigResolver.prototype, {
	'getConfigForBuild': function(build) {
		var dirOfThisBuild = build || this._appConfig.DEFAULT_BUILD;

		var buildConfig = require(path.resolve(this._appConfig.BUILD_CONFIG_DIR, dirOfThisBuild, 'config'));
		var resourceDir = path.resolve(this._appConfig.BUILD_CONFIG_DIR, dirOfThisBuild, 'build_resources');

		return {
			'buildDir': path.resolve(this._appConfig.BUILD_DIR, buildConfig.BUILD_DIR),
			'topLevelDir': buildConfig.NAME_OF_TOP_DIR,
			'resourceDir': resourceDir,
			'composerCommand': this._appConfig.COMPOSER_COMMAND
		};
	}
});

module.exports = ConfigResolver;