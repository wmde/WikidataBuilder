<?php

if ( !defined( 'MEDIAWIKI' ) ) {
	die( 'Not an entry point.' );
}

// no magic, use wmf configs instead to control which entry points to load
$wgEnableWikibaseRepo = false;
$wgEnableWikibaseClient = false;

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/extensions/Wikibase/repo/Wikibase.php';
require_once __DIR__ . '/extensions/Wikibase/client/WikibaseClient.php';

$wgExtensionCredits['wikibase'][] = array(
	'path' => __DIR__,
	'name' => 'Wikidata Build',
	'author' => array(
		'The Wikidata team', // TODO: link?
	),
	'url' => 'https://www.mediawiki.org/wiki/Wikidata_build',
	'description' => 'Wikidata extensions build'
);
