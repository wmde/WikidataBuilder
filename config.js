'use strict';

var path = require('path');

var baseDir = process.cwd();

module.exports = {
	DEFAULT_BUILD: 'wikidata_master',

	BUILD_CONFIG_DIR: path.resolve(baseDir, 'build_config'),
	BUILD_DIR: path.resolve(baseDir, 'build'),
	COMPOSER_COMMAND: 'php ' + path.resolve(baseDir, 'bin/composer.phar')
};