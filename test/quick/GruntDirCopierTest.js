'use strict';

var GruntDirCopier = require('./../../src/GruntDirCopier');
var grunt = require('grunt');

exports.testCase = {

	setUp: function(done) {
		var dirName = Math.round((new Date()).getTime() / 1000).toString();
		this._sourceDir = '/tmp/wdb/' + dirName + '/a';
		this._targetDir = '/tmp/wdb/' + dirName + '/b';

		grunt.file.mkdir(this._sourceDir);
		grunt.file.mkdir(this._targetDir);

		var files = [
			'/nyan.cat',
			'/onoez.txt',
			'/FileNameWithoutAnExtension'
		];

		this._expectedFiles = [];

		for ( var i in files ) {
			var file = files[i];
			grunt.file.write(this._sourceDir + file, '~=[,,_,,]:3');
			this._expectedFiles.push(this._targetDir + file);
		}

		done();
	},

	'copy some files': function(test) {
		var expectedFiles = this._expectedFiles;

		var copier = new GruntDirCopier(grunt);

		test.expect(expectedFiles.length);

		copier.once(
			'copied',
			function() {
				for (var i in expectedFiles) {
					var file = expectedFiles[i];
					test.ok(grunt.file.exists(file));
				}

				test.done();
			}
		);

		copier.copy(this._sourceDir, this._targetDir);
	}

};