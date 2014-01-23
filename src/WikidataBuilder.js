'use strict';

var path = require('path');
var extend = require('extend');
var GruntDirCopier = require('./GruntDirCopier');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

/**
 * Options:
 * - buildDir: Full path of the directory in which to place the build directory
 * - topLevelDir: Name of the top level directory of the build
 * - resourceDir: Full path of the directory from which to copy build resources
 * - composerCommand: The command to run to do a Composer install
 * - tarballName: File name of the tarballs, without file type extension. Optional, defaults to topLevelDir
 */
function WikidataBuilder(options) {
	EventEmitter.call(this);

	this._grunt = require('grunt');

	this._options = extend(
		{
			tarballName: options.topLevelDir
		},
		options
	);
}

inherits(WikidataBuilder, EventEmitter);

extend(WikidataBuilder.prototype, {
	'build': function() {
		this._createBuildDir();
		this._prepareBuildDir();

		var self = this;

		this._runComposer(
			function(error) {
				self._createTarballs(
					function() {
						self.emit('done', error);
					}
				);
			}
		);
	},

	'_getBuildPath': function() {
		return path.resolve(
			this._options.buildDir,
			this._options.topLevelDir
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
			this._options.composerCommand + ' install --ansi --prefer-source --optimize-autoloader',
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
	},

	'_createTarballs': function(done) {
		var Tar = require('tar.gz');
		var zipper = new Tar();

		zipper.compress(
			this._getBuildPath(),
			this._getTarballFilePath() + '.tar.gz',
			function(error) {
				done();
			}
		);
	},

	'_getTarballFilePath': function() {
		return path.resolve(
			this._options.buildDir,
			this._options.tarballName
		);
	}
});

module.exports = WikidataBuilder;
