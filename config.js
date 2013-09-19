'use strict';

var path = require('path');

module.exports = {
	BUILD_DIR: path.resolve(process.cwd(), 'build'),
	RESOURCE_DIR: path.resolve(process.cwd(), 'build_resources'),
	COMPOSER_COMMAND: 'php ' + path.resolve(process.cwd(), 'bin/composer.phar')
};