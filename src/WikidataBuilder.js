'use strict';

var path = require('path');

function WikidataBuilder(grunt, done, buildDir) {
	this._grunt = grunt;
	this._done = done;

	this._buildDir = buildDir;
}

WikidataBuilder.prototype = {
	'build': function() {
		this._createBuildDir();
		this._prepareBuildDir();

		this._runComposer(this._done);
	},

	'_createBuildDir': function() {
		this._grunt.file.mkdir(this._buildDir);
	},

	'_prepareBuildDir': function() {
		this._grunt.file.copy('composer.json', this._buildDir + 'composer.json');
	},

	'_runComposer': function(done) {
		var exec = require('child_process').exec;

		var composer = path.resolve(process.cwd(), 'bin/composer.phar');

		var composerProcess = exec(
			'cd ' + this._buildDir + '; php ' + composer + ' install --ansi',
			{
				// cdw: this._buildDir
			},
			function(error, stdout, stderr) {
				done(error===null);
			}
		);

		composerProcess.stdout.on(
			'data',
			this._grunt.log.write
		);
	}
};

module.exports = WikidataBuilder;