<?php

namespace Wikidata;

/**
 * @license GNU GPL v2+
 *
 * @author Katie Filbert < aude.wiki@gmail.com >
 */
class SettingsFileGenerator {

	public static function generateDefaultSettings() {
		$settingsBuilder = new WikidataSettingsBuilder();
		$settingsFileGenerator = new self();

		$settingsFileGenerator->generate(
			$settingsBuilder->getRepoSettings(),
			'wgWBRepoSettings',
			__DIR__ . '/../WikibaseRepo.settings.php'
		);

		$settingsFileGenerator->generate(
			$settingsBuilder->getClientSettings(),
			'wgWBClientSettings',
			__DIR__ . '/../WikibaseClient.settings.php'
		);
	}

	/**
	 * @param string $settingsVariable e.g. wgWBRepoSettings or wgWBClientSettings
	 * @param string $filename
	 * @param array $settings
	 *
	 * @throws \RuntimeException
	 */
	public function generate( array $settings, $settingsVariable, $filename ) {
		$settingsArray = array();

		foreach( $settings as $setting => $value ) {
			$settingsArray[] = '$' . $settingsVariable . '["' . $setting . '"] = "' . $value . '";';
		}

		$fileContents = "<?php\n";
		$fileContents .= implode( "\n", $settingsArray );

		if ( !file_put_contents( $filename, $fileContents ) ) {
			throw new \RuntimeException( "Failed to generate file: $filename" );
		}
	}

}
