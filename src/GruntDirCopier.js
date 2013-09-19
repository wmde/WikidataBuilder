'use strict';

var path = require('path');
var EventEmitter = require('events').EventEmitter;

function GruntDirCopier(grunt) {
	EventEmitter.call(this);

	this._grunt = grunt;
}

GruntDirCopier.prototype = Object.create(EventEmitter.prototype);
GruntDirCopier.prototype.constructor = GruntDirCopier;

GruntDirCopier.prototype.copy = function(sourceDir, targetDir) {
	var files = this._grunt.file.expand(
		{
			matchBase: true,
			cwd: sourceDir
		},
		'*.*'
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