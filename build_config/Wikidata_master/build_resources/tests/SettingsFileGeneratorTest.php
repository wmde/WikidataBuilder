<?php

namespace Wikidata\Tests;

use Wikidata\SettingsFileGenerator;

/**
 * @covers Wikidata\SettingsFileGenerator
 * @group Wikidata
 *
 * @license GNU GPL v2+
 *
 * @author Katie Filbert < aude.wiki@gmail.com >
 */
class SettingsFileGeneratorTest extends \PHPUnit_Framework_TestCase {

	public function testGenerate() {
		$settings = array(
			'beverage' => 'beer',
			'food' => 'chocolate'
		);

		$filename = tempnam( sys_get_temp_dir(), 'WikidataSettings.php' );

		$settingsFileGenerator = new SettingsFileGenerator();
		$settingsFileGenerator->generate( $settings, 'wgWikidataSettings', $filename );

		include( $filename );

		$this->assertEquals( $settings, $wgWikidataSettings );

		unlink( $filename );
	}

	public function testGenerateDefaultSettings() {
		global $wgWBClientSettings, $wgWBRepoSettings;

		include __DIR__ . '/../WikibaseClient.settings.php';
		include __DIR__ . '/../WikibaseRepo.settings.php';

		$this->assertRegExp( '/wikibase:WBL\/\d+/', $wgWBClientSettings['sharedCacheKeyPrefix'] );
		$this->assertRegExp( '/wikibase:WBL\/\d+/', $wgWBRepoSettings['sharedCacheKeyPrefix'] );

		$this->assertEquals(
			$wgWBClientSettings['sharedCacheKeyPrefix'],
			$wgWBRepoSettings['sharedCacheKeyPrefix']
		);
	}

}
