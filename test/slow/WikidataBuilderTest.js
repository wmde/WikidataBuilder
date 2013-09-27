'use strict';

var WikidataBuilder = require('./../../src/WikidataBuilder');
var ConfigResolver = require('./../../src/ConfigResolver');
var grunt = require('grunt');
var path = require('path');

exports.testCase = {

	'run the build': function(test) {
		var appConfig = require('./../../config');
		appConfig.BUILD_DIR = '/tmp/wdb-build/';

		var configResolver = new ConfigResolver(appConfig);
		var buildConfig = configResolver.getConfigForBuild();

		var builder = new WikidataBuilder(
			grunt,
			buildConfig
		);

		test.expect(2);

		builder.once(
			'done',
			function(error) {
				var vendorPath = path.resolve(buildConfig.buildDir, buildConfig.topLevelDir, 'vendor');

				test.ok(
					error === null,
					'The error should be null. Error: ' + error
				);

				test.ok(
					grunt.file.exists(vendorPath),
					'The vendor path should exist: ' + vendorPath
				);

				test.done();
			}
		);

		builder.build();
	}

};