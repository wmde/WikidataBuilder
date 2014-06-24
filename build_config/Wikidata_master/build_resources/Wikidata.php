<?php
if ( !defined( 'MEDIAWIKI' ) ) {
	die( 'Not an entry point.' );
}

// Jenkins stuff part1
if ( PHP_SAPI === 'cli' && getenv( 'JOB_NAME' ) === 'mwext-Wikidata-testextensions-master') {
	// in future, run as non-experimental
	if ( !defined( 'WB_EXPERIMENTAL_FEATURES' ) || !WB_EXPERIMENTAL_FEATURES ) {
		define( 'WB_EXPERIMENTAL_FEATURES', true );
	}

	$wmgUseWikibaseRepo = true;
	$wmgUseWikibasePropertySuggester = true;
	$wmgUseWikibaseClient = true;
}

// no magic, use wmf configs instead to control which entry points to load
$wgEnableWikibaseRepo = false;
$wgEnableWikibaseClient = false;

include_once __DIR__ . '/vendor/autoload.php';

if ( !empty( $wmgUseWikibaseRepo ) ) {
	include_once __DIR__ . '/extensions/Wikibase/repo/Wikibase.php';

	if ( !empty( $wmgUseWikibasePropertySuggester ) ) {
		include_once __DIR__ . '/extensions/PropertySuggester/PropertySuggester.php';
	}
}

if ( !empty( $wmgUseWikibaseClient ) ) {
	include_once __DIR__ . '/extensions/Wikibase/client/WikibaseClient.php';
}

$wgExtensionCredits['wikibase'][] = array(
	'path' => __FILE__,
	'name' => 'Wikidata',
	'author' => array(
		'The Wikidata team', // TODO: link?
	),
	'url' => 'https://www.mediawiki.org/wiki/Wikidata_build',
	'description' => 'Wikidata extensions build'
);

// Jenkins stuff part2
if( PHP_SAPI === 'cli' && getenv( 'JOB_NAME' ) === 'mwext-Wikidata-testextensions-master') {
	//Jenkins always loads both so no need to check if they are loaded before getting settings
	require_once __DIR__ . '/extensions/Wikibase/repo/ExampleSettings.php';
	require_once __DIR__ . '/extensions/Wikibase/client/ExampleSettings.php';
}
