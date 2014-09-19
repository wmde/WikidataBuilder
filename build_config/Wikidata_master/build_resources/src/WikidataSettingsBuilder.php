<?php

namespace Wikidata;

/**
 * Dynamically generates settings for Wikidata
 *
 * @license GNU GPL v2+
 *
 * @author Katie Filbert < aude.wiki@gmail.com >
 */
class WikidataSettingsBuilder {

	private $commonSettings;

	/**
	 * @return array
	 */
	public function getRepoSettings() {
		return $this->getCommonSettings();
	}

	/**
	 * @return array
	 */
	public function getClientSettings() {
		return $this->getCommonSettings();
	}

	private function getCommonSettings() {
		if ( !isset( $this->commonSettings ) ) {
			$this->buildCommonSettings();
		}

		return $this->commonSettings;
	}

	private function buildCommonSettings() {
		$this->addSharedCacheKeyPrefix();
	}

	private function addSharedCacheKeyPrefix() {
		$this->commonSettings['sharedCacheKeyPrefix'] = 'wikibase:WBL/' . time();
	}

}
