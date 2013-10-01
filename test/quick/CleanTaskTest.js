'use strict';

var CleanTask = require('./../../src/task/CleanTask');

exports.testCase = {

	'run clean on temp directory': function(test) {
		var appConfig = require('./../../appConfig' )();
		appConfig.BUILD_DIR = 'tmp/wdb-clean';

		var task = new CleanTask(appConfig);

		test.expect(1);

		task.run(
			function(){},
			function(success) {
				test.ok(success);
				test.done();
			}
		);
	}

};