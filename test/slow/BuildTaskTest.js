'use strict';

var BuildTask = require('./../../src/task/BuildTask');
var grunt = require('grunt');
var path = require('path');

var runCount = 0;

function getBuildPath() {
	var time = Math.round((new Date()).getTime() / 1000 ).toString();
	runCount += 1;
	return '/tmp/wdb-task-build/build/' + time + runCount + '/';
}

function getAppConfig(configPath) {
	var appConfig = require('./../../appConfig')();

	appConfig.BUILD_DIR = getBuildPath();

	if (configPath !== undefined) {
		appConfig.BUILD_CONFIG_DIR = configPath;
	}

	return appConfig;
}

function assertBuildWithConfigRuns(test, config, configPath) {
	test.expect(1);

	var appConfig = getAppConfig(configPath);
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
	},

	'run the build with package info': function(test) {
		assertBuildWithConfigRuns(
			test,
			{
				'buildName': 'ParserHooks',
				'packageName': 'mediawiki/parser-hooks',
				'packageVersion': '>=1.2'
			},
			'/tmp/wdb-task-build/config/'
		);
	}

};