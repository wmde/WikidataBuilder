'use strict';

var WikidataBuilder = require('./../../src/WikidataBuilder');
var ConfigResolver = require('./../../src/ConfigResolver');
var grunt = require('grunt');
var path = require('path');
var config = require('./../../config');

var BUILD_DIR = '/tmp/wdb-build/';

exports.testCase = {

	'run the build': function(test) {
		var configResolver = new ConfigResolver(require('./config'));

		var builder = new WikidataBuilder(
			grunt,
			configResolver.getConfigForBuild()
		);

		test.expect(2);

		builder.once(
			'done',
			function(error) {
				var vendorPath = path.resolve(BUILD_DIR, config.BUILD_NAME, 'Wikidata', 'vendor');

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