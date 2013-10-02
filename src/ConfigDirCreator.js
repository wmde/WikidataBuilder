'use strict';

var EventEmitter = require('events').EventEmitter;
var path = require('path');
var inherits = require('inherits');
var mkdirp = require('mkdirp');
var fs = require('fs');

function ConfigDirCreator(configRoot) {
	EventEmitter.call(this);
	this._configRoot = configRoot;
}

inherits(ConfigDirCreator, EventEmitter);

/**
 * @param options
 * Options is a map that can hold:
 * - configName: string, required
 * - buildName: string, optional
 * - packageName: string, optional
 * - packageVersion: string, optional
 */
ConfigDirCreator.prototype.create = function(options) {
	this._options = options;
	this._configDir = path.resolve(this._configRoot, options.configName);

	if ( fs.existsSync(this._configDir) ) {
		this.emit("done");
	}
	else {
		this._createConfig();
	}
};

ConfigDirCreator.prototype._createConfig = function() {
	this._createDir();

	var self = this;

	this._createResources(function() {
		self._createConfigJs(function() {
			self.emit("created");
			self.emit("done");
		});
	});
};

ConfigDirCreator.prototype._createDir = function() {
	mkdirp.sync(this._configDir);
};

ConfigDirCreator.prototype._createResources = function(done) {
	var resourceDir = path.resolve(
		this._configDir,
		'build_resources'
	);

	fs.mkdirSync(resourceDir);

	var self = this;

	this._createEntryPoint(resourceDir, function() {
		self._createComposerJsonFile(resourceDir, done);
	});
};

ConfigDirCreator.prototype._createEntryPoint = function(resourceDir, done) {
	var php = "<?php\n\
\n\
if ( !is_readable( __DIR__ . '/vendor/autoload.php' ) ) {\n\
	die( 'y u no run the build script?' );\n\
}\n\
\n\
include_once( __DIR__ . '/vendor/autoload.php' );";

	this._createFile(
		path.resolve(resourceDir, this._options.configName + '.php'),
		php,
		done
	);
};

ConfigDirCreator.prototype._createComposerJsonFile = function(resourceDir, done) {
	this._createFile(
		path.resolve(resourceDir, 'composer.json'),
		JSON.stringify(
			this._getComposerJson(),
			null,
			4
		),
		done
	);
};

ConfigDirCreator.prototype._getComposerJson = function() {
	var json = {
		"require": {
			"php": ">=5.3.0"
		},
		"minimum-stability" : "dev"
	};

	if (this._options.packageName !== undefined) {
		json.require[this._options.packageName] = this._options.packageVersion || '*';
	}

	return json;
};

ConfigDirCreator.prototype._createConfigJs = function(done) {
	this._createFile(
		path.resolve(this._configDir, 'config.js'),
		"'use strict';\n\
\n\
module.exports = {\n\
	NAME_OF_TOP_DIR: '" + this._options.configName + "',\n\
	BUILD_DIR: '" + this._options.configName + "'\n\
};",
		done
	);
};

ConfigDirCreator.prototype._createFile = function(filePath, content, done) {
	var writeStream = fs.createWriteStream(filePath);
	writeStream.end(content, 'utf8', done);
};

module.exports = ConfigDirCreator;
