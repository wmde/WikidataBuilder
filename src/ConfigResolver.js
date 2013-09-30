'use strict';

var extend = require('extend');
var EventEmitter = require('events').EventEmitter;
var path = require('path');
var inherits = require('inherits');

function ConfigResolver(appConfig) {
	EventEmitter.call(this);
	this._appConfig = appConfig;
}

inherits(ConfigResolver, EventEmitter);

extend(ConfigResolver.prototype, {
	'getConfigForBuild': function(build, done) {
		var dirOfThisBuild = build || this._appConfig.DEFAULT_BUILD;
		var self = this;

		this._createDefaultConfigIfNeeded(dirOfThisBuild, function() {
			done(self._createConfigMap(dirOfThisBuild));
		});
	},

	'_createDefaultConfigIfNeeded': function(configDir, done) {
		var ConfigDirCreator = require('./ConfigDirCreator');
		var dirCreator = new ConfigDirCreator(this._appConfig.BUILD_CONFIG_DIR);

		dirCreator.once('done', done);

		dirCreator.create(configDir);
	},

	'_createConfigMap': function(dirOfThisBuild) {
		var buildConfig = require(path.resolve(
			this._appConfig.BUILD_CONFIG_DIR,
			dirOfThisBuild,
			'config'
		));

		var resourceDir = path.resolve(
			this._appConfig.BUILD_CONFIG_DIR,
			dirOfThisBuild,
			'build_resources'
		);

		return {
			'buildDir': path.resolve(this._appConfig.BUILD_DIR, buildConfig.BUILD_DIR),
			'topLevelDir': buildConfig.NAME_OF_TOP_DIR,
			'resourceDir': resourceDir,
			'composerCommand': this._appConfig.COMPOSER_COMMAND,
			'tarballName': buildConfig.TARBALL_NAME || buildConfig.NAME_OF_TOP_DIR
		};
	}
});

module.exports = ConfigResolver;