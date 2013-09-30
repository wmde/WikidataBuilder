'use strict';

var ConfigDirCreator = require('./../../src/ConfigDirCreator');
var path = require('path');
var fs = require('fs');

var CONFIG_DIR = '/tmp/wdb-config/';
var CONFIG_NAME = 'Foo' + Math.round((new Date()).getTime() / 1000 ).toString() + 'Bar';

exports.testCase = {

	'example config gets created as expected': function(test) {
		test.expect(3);

		var resolver = new ConfigDirCreator(CONFIG_DIR);

		resolver.once(
			'created',
			function() {
				test.ok(fs.existsSync(CONFIG_DIR + CONFIG_NAME));

				test.ok(fs.existsSync(path.resolve(
					CONFIG_DIR,
					CONFIG_NAME,
					'build_resources',
					CONFIG_NAME + '.php'
				)));

				test.ok(fs.existsSync(path.resolve(
					CONFIG_DIR,
					CONFIG_NAME,
					'build_resources',
					'composer.json'
				)));

				test.done();
			}
		);

		resolver.create(CONFIG_NAME);
	}

};