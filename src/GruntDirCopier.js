'use strict';

var path = require('path');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

function GruntDirCopier(grunt) {
	EventEmitter.call(this);

	this._grunt = grunt;
}

inherits(GruntDirCopier, EventEmitter);

GruntDirCopier.prototype.copy = function(sourceDir, targetDir) {
	var files = this._grunt.file.expand(
		{
			matchBase: true,
			dot: true,
			cwd: sourceDir
		},
		'*'
	);

	for ( var i in files ) {
		var file = files[i];

		this._grunt.file.copy(
			path.resolve(sourceDir, file),
			path.resolve(targetDir, file)
		);
	}

	this.emit('copied');
};

module.exports = GruntDirCopier;