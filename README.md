# Wikidata build

Builds of the software for the Wikidata project.

This repo contains both the build tools and the builds.

## Using a build

Requirements:

* PHP 5.3 or later
* A recent MediaWiki installation

A build can be seen as a big MediaWiki extension that has no further dependencies.

## Creating a build

Requirements:

* [Node.js](http://nodejs.org/) 0.8 or later
* [npm](https://npmjs.org/) 1.1 or later

Steps to create a build:

* npm install
* grunt build

Other commands:

Running the tests: npm test

To see all available commands: grunt --help
