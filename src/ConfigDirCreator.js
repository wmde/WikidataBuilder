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

ConfigDirCreator.prototype.create = function(configName) {
	this._configName = configName;
	this._configDir = path.resolve(this._configRoot, configName);

	if ( fs.existsSync(this._configDir) ) {
		this.emit("done");
	}
	else {
		this._createConfig();
	}
};

ConfigDirCreator.prototype._createConfig = function() {
	this._createDir();
	this._createResources();
	this._createConfigJs();

	this.emit("created");
	this.emit("done");
};

ConfigDirCreator.prototype._createDir = function() {
	mkdirp.sync(this._configDir);
};

ConfigDirCreator.prototype._createResources = function() {
	var resourceDir = path.resolve(
		this._configDir,
		'build_resources'
	);

	fs.mkdirSync(resourceDir);

	this._createEntryPoint(resourceDir);
	this._createComposerJson(resourceDir);
};

ConfigDirCreator.prototype._createEntryPoint = function(resourceDir) {
	var php = "<?php\n\
\n\
if ( !is_readable( __DIR__ . '/vendor/autoload.php' ) ) {\n\
	die( 'y u no run the build script?' );\n\
}\n\
\n\
include_once( __DIR__ . '/vendor/autoload.php' );";

	this._createFile(
		path.resolve(resourceDir, this._configName + '.php'),
		php
	);
};

ConfigDirCreator.prototype._createComposerJson = function(resourceDir) {
	var json = '{\n\
	"require": {\n\
		"php": ">=5.3.0"\n\
	}\n\
}';

	this._createFile(
		path.resolve(resourceDir, 'composer.json'),
		json
	);
};

ConfigDirCreator.prototype._createConfigJs = function() {
	this._createFile(
		path.resolve(this._configDir, 'config.js'),
		"'use strict';\n\
\n\
module.exports = {\n\
	NAME_OF_TOP_DIR: '" + this._configName + "',\n\
	BUILD_DIR: '" + this._configName + "'\n\
};"
	);
};

ConfigDirCreator.prototype._createFile = function(filePath, content) {
	var writeStream = fs.createWriteStream(filePath);
	writeStream.write(content);
	writeStream.close();
};

module.exports = ConfigDirCreator;
