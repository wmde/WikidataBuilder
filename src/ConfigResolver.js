'use strict';

var extend = require('extend');
var path = require('path');
var inherits = require('inherits');

function ConfigResolver(appConfig) {
	this._appConfig = appConfig;
}

extend(ConfigResolver.prototype, {
	'getConfigForBuild': function(buildName, done) {
		var buildConfigDir = path.resolve(
			this._appConfig.BUILD_CONFIG_DIR,
			buildName
		);

		var buildConfig = require(path.resolve(
			buildConfigDir,
			'config'
		));

		var resourceDir = path.resolve(
			buildConfigDir,
			'build_resources'
		);

		done({
			'buildDir': path.resolve(this._appConfig.BUILD_DIR, buildConfig.BUILD_DIR),
			'topLevelDir': buildConfig.NAME_OF_TOP_DIR,
			'resourceDir': resourceDir,
			'composerCommand': this._appConfig.COMPOSER_COMMAND,
			'tarballName': buildConfig.TARBALL_NAME || buildConfig.NAME_OF_TOP_DIR
		});
	}
});

module.exports = ConfigResolver;