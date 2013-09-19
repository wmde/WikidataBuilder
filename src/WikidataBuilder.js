'use strict';

var path = require('path');
var GruntDirCopier = require('./GruntDirCopier');

function WikidataBuilder(grunt, done, options) {
	this._grunt = grunt;
	this._done = done;
	this._options = options;
}

WikidataBuilder.prototype = {
	'build': function() {
		this._createBuildDir();
		this._prepareBuildDir();

		this._runComposer(this._done);
	},

	'_getBuildPath': function() {
		return path.resolve(
			this._options.buildDir,
			this._options.buildName
		);
	},

	'_createBuildDir': function() {
		this._grunt.file.mkdir(this._getBuildPath());
	},

	'_prepareBuildDir': function() {
		var copier = new GruntDirCopier(this._grunt);

		copier.copy(
			this._options.resourceDir,
			this._getBuildPath()
		);
	},

	'_runComposer': function(done) {
		var exec = require('child_process').exec;

		var composerProcess = exec(
			'cd ' + this._getBuildPath() + '; ' + this._options.composerCommand + ' install --ansi',
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