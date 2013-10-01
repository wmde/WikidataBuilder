'use strict';

var path = require('path');
var extend = require('extend');

var baseDir = process.cwd();

module.exports = function() {
	return {
		DEFAULT_BUILD: 'ExampleConfig',

		BUILD_CONFIG_DIR: path.resolve(baseDir, 'build_config'),
		BUILD_DIR: path.resolve(baseDir, 'build'),
		COMPOSER_COMMAND: 'php ' + path.resolve(baseDir, 'bin/composer.phar')
	};
};
