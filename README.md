# Wikidata builder

Build and release tool for MediaWiki extensions that support [Composer](https://getcomposer.org/).

[![Build Status](https://travis-ci.org/JeroenDeDauw/WikidataBuilder.png?branch=master)](https://travis-ci.org/JeroenDeDauw/WikidataBuilder)

## Build tool installation:

Wikidata builder has the following requirements:

* [Node.js](http://nodejs.org/) 0.8 or later
* [npm](https://npmjs.org/) 1.1 or later
* [PHP](http://php.net/) 5.3 or later
* Debian like environment (production code might run on Windows, some tests do not run on Windows)
* Suggested: grunt-cli (npm install -g grunt-cli)

Once your environment meets these requirements, run "npm install" in the root of Wikidata builder.

## Steps to create a build:

### Build configuration

Configuration for your build is placed in build_config/yourBuild, where "yourBuild" is a name
you pick. This directory needs to contain the following files:

* config.js
* build_resources
    * composer.json

config.js contains configuration specific to your build. See build_config/ExampleConfig/config.js
for an example and documentation of the required values.

build_resources/composer.json defines the packages that make up the build, including their versions.

### Running the build

Execute "grunt build:yourBuild" in the root directory of Wikidata builder.

In case grunt-cli is not installed, replace "grunt" by "./node_modules/.bin/grunt"

### Build results

The result of a build can be found in the "build" directory. More precisely,
at "build/BUILD_DIR/NAME_OF_TOP_DIR", where the upper case segments are the
values defined in your config.js file.

This build directory will contain a TARBALL_NAME.tar.gz and a directory "NAME_OF_TOP_DIR/" which contains:

* NAME_OF_TOP_DIR.php
* composer.json
* Any other resources you put in your build_resources directory.

## Other commands:

* Running linting and tests: grunt integrate (or npm test)
* Removing the builds: grunt clean
* To see all available commands: grunt --help

## TODOs

* Support files without extensions in dir copier
* Support pushing build result to git repos
* Think about how to support npm and bower packages

## Authors and license

Wikidata Builder has been written by [Jeroen De Dauw](https://www.mediawiki.org/wiki/User:Jeroen_De_Dauw)
as [Wikimedia Germany](https://wikimedia.de) employee for the [Wikidata project](https://wikidata.org/).

It is released under the GNU GPL v2 or later. You can find a copy of the license in
the [COPYING file](COPYING).

## Release notes

### 0.1 (under development)

* Initial version

## Links

* [The Wikibase project](https://www.mediawiki.org/wiki/Wikibase)