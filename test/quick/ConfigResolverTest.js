'use strict';

var ConfigResolver = require('./../../src/ConfigResolver');
var path = require('path');

exports.testCase = {

	'example config resolves as expected': function(test) {
		var appConfig = require('./../../config');
		var baseDir = process.cwd();

		var resolver = new ConfigResolver(appConfig);

		test.deepEqual(
			resolver.getConfigForBuild(),
			{
				'buildDir': path.resolve(baseDir, 'build/ExampleBuild_master'),
				'topLevelDir': 'ExampleBuild',
				'resourceDir':  path.resolve(baseDir, 'build_config/ExampleConfig/build_resources'),
				'composerCommand': appConfig.COMPOSER_COMMAND
			}
		);

		test.done();
	}

};