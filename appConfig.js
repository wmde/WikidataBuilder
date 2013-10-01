'use strict';

var path = require('path');
var extend = require('extend');

var baseDir = process.cwd();

var config = {
	DEFAULT_BUILD: 'ExampleConfig',

	BUILD_CONFIG_DIR: path.resolve(baseDir, 'build_config'),
	BUILD_DIR: path.resolve(baseDir, 'build'),
	COMPOSER_COMMAND: 'php ' + path.resolve(baseDir, 'bin/composer.phar')
};

module.exports = function() {
	return extend({}, config);
};
