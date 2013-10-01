'use strict';

var BuildTask = require('./../../src/task/BuildTask');
var grunt = require('grunt');
var path = require('path');

var runCount = 0;

function getBuildPath() {
	var time = Math.round((new Date()).getTime() / 1000 ).toString();
	runCount += 1;
	return '/tmp/wdb-build/task/' + time + runCount + '/';
}

function getAppConfig() {
	var appConfig = require('./../../appConfig')();
	appConfig.BUILD_DIR = getBuildPath();
	return appConfig;
}

function assertBuildWithConfigRuns(test, config) {
	test.expect(1);

	var appConfig = getAppConfig();
	var task = new BuildTask(appConfig);

	task.run(
		config,
		function(){},
		function(success) {
			test.ok(success);
			test.done();
		}
	);
}

exports.testCase = {

	'run the build with no args': function(test) {
		assertBuildWithConfigRuns(
			test,
			{}
		);
	},

	'run the build with build name': function(test) {
		assertBuildWithConfigRuns(
			test,
			{
				'buildName': 'ExampleConfig'
			}
		);
	}

	// TODO
//	'run the build with package info': function(test) {
//		assertBuildWithConfigRuns(
//			test,
//			{
//				'buildName': 'Diff_BuildTask_test',
//				'packageName': 'diff/diff',
//				'packageVersion': '0.8'
//			}
//		);
//	}

};