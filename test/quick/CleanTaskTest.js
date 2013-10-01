'use strict';

var BuildTask = require('./../../src/task/CleanTask');
var grunt = require('grunt');

exports.testCase = {

	'run clean on temp directory': function(test) {
		var appConfig = require('./../../appConfig' )();
		appConfig.BUILD_DIR = 'tmp/wdb-clean';

		var task = new BuildTask(appConfig);

		test.expect(1);

		task.run(
			require('grunt'),
			function(success) {
				test.ok(success);
				test.done();
			}
		);
	}

};