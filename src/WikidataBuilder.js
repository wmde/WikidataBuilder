'use strict';

var path = require('path');
var extend = require('extend');
var GruntDirCopier = require('./GruntDirCopier');
var EventEmitter = require('events').EventEmitter;

function WikidataBuilder(grunt, options) {
	EventEmitter.call(this);

	this._grunt = grunt;
	this._options = options;
}

WikidataBuilder.prototype = Object.create(EventEmitter.prototype);
WikidataBuilder.prototype.constructor = WikidataBuilder;

extend(WikidataBuilder.prototype, {
	'build': function() {
		this._createBuildDir();
		this._prepareBuildDir();

		this._runComposer(
			function(error) {
				this.emit('done', error);
			}.bind(this)
		);
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
			this._options.composerCommand + ' install --ansi',
			{
				cwd: this._getBuildPath()
			},
			function(error, stdout, stderr) {
				done(error);
			}
		);

		composerProcess.stdout.on(
			'data',
			this._grunt.log.write
		);
	}
} );

module.exports = WikidataBuilder;