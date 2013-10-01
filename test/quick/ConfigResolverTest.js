'use strict';

var BuildConfigReader = require('./../../src/BuildConfigReader');
var path = require('path');

exports.testCase = {

	'example config resolves as expected': function(test) {
		var appConfig = require('./../../appConfig')();
		var baseDir = process.cwd();

		var resolver = new BuildConfigReader(appConfig);

		test.expect(1);

		resolver.getConfigForBuild('ExampleConfig', function(config) {
			test.deepEqual(
				config,
				{
					'buildDir': path.resolve(baseDir, 'build/ExampleBuild_master'),
					'topLevelDir': 'ExampleBuild',
					'resourceDir':  path.resolve(baseDir, 'build_config/ExampleConfig/build_resources'),
					'composerCommand': appConfig.COMPOSER_COMMAND,
					'tarballName': 'ExampleBuild4.2'
				}
			);

			test.done();
		});
	}

};