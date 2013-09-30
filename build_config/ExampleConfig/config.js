'use strict';

/**
 * Build specific configuration.
 *
 * @type {{
 * NAME_OF_TOP_DIR: string The name of the top level directory of the build,
 * BUILD_DIR: string Directory to place the build into, relative to the application build directory
 * TARBALL_NAME: string File name of the tarballs, without file type extension
 * }}
 */
module.exports = {
	NAME_OF_TOP_DIR: 'ExampleBuild',
	BUILD_DIR: 'ExampleBuild_master',
	TARBALL_NAME: 'ExampleBuild4.2'
};