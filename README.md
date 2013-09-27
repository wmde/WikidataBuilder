# Wikidata builder

Building tool for creating builds of the Wikibase software for the Wikidata project.

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
** composer.json

config.js contains configuration specific to your build. See build_config/ExampleConfig/config.js
for an example and documentation of the required values.

build_resources/composer.json defines the packages that make up the build, including their versions.

### Running the build

Execute "grunt build:yourBuild" in the root directory of Wikidata builder.

In case grunt-cli is not installed, replace "grunt" by "./node_modules/.bin/grunt"

The result of the build can be found in the "build" directory.

## Other commands:

* Running linting and tests: grunt integrate (or npm test)
* Removing the builds: grunt clean
* To see all available commands: grunt --help
