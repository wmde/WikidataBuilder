<?php

namespace Wikidata\Tests;

use Wikidata\WikidataSettingsBuilder;

/**
 * @covers Wikidata\WikidataSettingsBuilder
 * @group Wikidata
 *
 * @license GNU GPL v2+
 *
 * @author Katie Filbert < aude.wiki@gmail.com >
 */
class WikidataSettingsBuilderTest extends \PHPUnit_Framework_TestCase {

	public function testGetRepoSettings() {
		$settingsBuilder = new WikidataSettingsBuilder();
		$settings = $settingsBuilder->getRepoSettings();

		$this->assertRegExp( '/wikibase:WBL\/\d+/', $settings['sharedCacheKeyPrefix'] );
	}

	public function testGetClientSettings() {
		$settingsBuilder = new WikidataSettingsBuilder();
		$settings = $settingsBuilder->getClientSettings();

		$this->assertRegExp( '/wikibase:WBL\/\d+/', $settings['sharedCacheKeyPrefix'] );
	}

}
