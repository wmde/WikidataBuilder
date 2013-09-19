'use strict';

var WikidataBuilder = require('./../src/WikidataBuilder');
var grunt = require('grunt');
var config = require('./../config');

var BUILD_DIR = '/tmp/wdb-build/';

exports.testCase = {

	'run the build': function(test) {
		var builder = new WikidataBuilder(
			grunt,
			{
				'buildDir': BUILD_DIR,
				'buildName': Math.round((new Date()).getTime() / 1000).toString(),
				'resourceDir': config.RESOURCE_DIR,
				'composerCommand': config.COMPOSER_COMMAND
			}
		);

		test.expect(1);

		builder.once(
			'done',
			function() {
				test.ok(true); // TODO
				test.done();
			}
		);

		builder.build();
	}

};