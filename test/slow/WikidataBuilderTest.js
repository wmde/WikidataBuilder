'use strict';

var WikidataBuilder = require('./../../src/WikidataBuilder');
var BuildConfigReader = require('./../../src/BuildConfigReader');
var grunt = require('grunt');
var path = require('path');

exports.testCase = {

	'run the build with default config': function(test) {
		test.expect(3);

		var appConfig = require('./../../appConfig')();
		appConfig.BUILD_DIR = '/tmp/wdb-build/default/' + Math.round((new Date()).getTime() / 1000 ).toString() + '/';

		var configResolver = new BuildConfigReader(appConfig);

		configResolver.getConfigForBuild(appConfig.DEFAULT_BUILD, function(buildConfig) {
			var builder = new WikidataBuilder(
				buildConfig
			);

			builder.once(
				'done',
				function(error) {
					test.ok(
						error === null,
						'The error should be null. Error: ' + error
					);

					test.ok(
						grunt.file.exists(path.resolve(
							buildConfig.buildDir,
							buildConfig.topLevelDir,
							'vendor'
						)),
						'The vendor path should exist'
					);

					test.ok(
						grunt.file.exists(path.resolve(
							buildConfig.buildDir,
							buildConfig.topLevelDir,
							'README.md'
						)),
						'The README.md file should have been copied'
					);

					test.done();
				}
			);

			builder.build();
		});
	}

};