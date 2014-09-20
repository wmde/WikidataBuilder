<?php

namespace Wikidata;

/**
 * @license GNU GPL v2+
 *
 * @author Katie Filbert < aude.wiki@gmail.com >
 */
final class WikidataHooks {

	/**
	 * @param array &$files
	 *
	 * @return boolean
	 */
	public static function onUnitTestsList( array &$files ) {
		// @codeCoverageIgnoreStart
		$directoryIterator = new \RecursiveDirectoryIterator( __DIR__ . '/../tests/' );

		/* @var SplFileInfo $fileInfo */
		foreach ( new \RecursiveIteratorIterator( $directoryIterator ) as $fileInfo ) {
			if ( substr( $fileInfo->getFilename(), -8 ) === 'Test.php' ) {
				$files[] = $fileInfo->getPathname();
			}
		}

		return true;
		// @codeCoverageIgnoreEnd
	}

}
