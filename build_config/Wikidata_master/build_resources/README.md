#Wikidata Build

Wikidata is using a build with Wikibase and its dependencies packaged into one git repo.

##Installation

1. Clone the git repo into the [mediawiki extensions directory](https://git.wikimedia.org/summary/mediawiki%2Fextensions%2FWikidata)
2. Add the following line to your LocalSettings.php. This entry point in turn loads all other entry points.

#####To enable Repo add the following

```php
$wgEnableWikibaseRepo = true;
$wgEnableWikibaseClient = false;
$wmgUseWikibaseRepo = true;
$wmgUseWikibaseClient = false;
require_once __DIR__ . "/extensions/Wikidata/Wikidata.php";
require_once __DIR__ . "/extensions/Wikidata/extensions/Wikibase/repo/ExampleSettings.php";
```

#####To enable Client add the following

```php
$wgEnableWikibaseRepo = false;
$wgEnableWikibaseClient = true;
$wmgUseWikibaseRepo = false;
$wmgUseWikibaseClient = true;
require_once __DIR__ . "/extensions/Wikidata/Wikidata.php";
```

##Configuration

Wikibase itself needs to be configured, with appropriate settings. See the below links:

* [Extension:Wikibase Repository](https://www.mediawiki.org/wiki/Extension:Wikibase_Repository)
* [Extension:Wikibase Client](https://www.mediawiki.org/wiki/Extension:Wikibase_Client)

Using this repo provides extra options to allow you to choose to deploy the Repo and/or Client.

```php
// Load the Repo Extension (default false)
$wmgUseWikibaseRepo = true;
// Load the Client Extension (default false)
$wmgUseWikibaseClient = true;
```

##Maintenance scripts

The Maintenance scripts help within this repo will not work if you do not have the environment variable **MW_INSTALL_PATH** defined.

If you do not and can not define this variable please use the **runScript.php** maintenance script within mediawiki core (see comments in that file for instructions).

##Automated build process

####Generating a build

* The build is triggered by a [cronjob](https://github.com/addshore/puppet/blob/master/files/wikidatabuilder/cron.sh) on the [wikidata-builder1](https://wikitech.wikimedia.org/wiki/Nova_Resource:Wikidata-build) instance at 10:00 AM (UTC) each day.
* The build script from https://github.com/wmde/WikidataBuilder is used to generate the build.
* The build is then pushed to a new commit in the [Wikidata repository](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/Wikidata) on Gerrit.

####Testing the build

* After a new commit was made, [WikidataJenkins](http://wikidata-jenkins.wmflabs.org/ci/) runs PHPUnit tests for [client](http://wikidata-jenkins.wmflabs.org/ci/job/wikidata-build-client-tests/) and [repo](http://wikidata-jenkins.wmflabs.org/ci/job/wikidata-build-repo-tests/) with experimental mode enabled and for [client](http://wikidata-jenkins.wmflabs.org/ci/job/wikidata-build-client-tests-nonexperimental/) and [repo](http://wikidata-jenkins.wmflabs.org/ci/job/wikidata-build-repo-tests-nonexperimental/) with experimental set to false.
* If the tests pass, WikidataJenkins verifies the change on Gerrit and votes +2 on CodeReview.
* The +2 makes [WMF Jenkins](https://integration.wikimedia.org/zuul/) run a gate-submit job which again runs some PHPUnit tests and then merges the change into master.

####Deployment to beta

* Once the change is merged into master, [beta-code-update](http://integration.wikimedia.org/ci/job/beta-code-update) job starts and deploys the new Wikidata build to https://wikidata.beta.wmflabs.org.
* This takes about 15 minutes and can be verified by checking the version of the Wikidata build on http://wikidata.beta.wmflabs.org/wiki/Special:Version.

####Browsertesting the new build on beta

* Whenever a new build is merged into master a [job for running browsertests](https://wikidata-jenkins.wmflabs.org/ci/job/wikidata-browsertests-sauce/) is triggered.
* The job is delayed by 30 minutes to give beta-code-updater enough time to finish deployment on beta.
* This job runs a set of [browsertests](https://git.wikimedia.org/tree/mediawiki%2Fextensions%2FWikibase/c4062fdfe5c4349411092a8baf4486454b0a5d59/tests%2Fbrowser) (Selenium) targeting the new build on beta.
* [Saucelabs](https://saucelabs.com/) is used to run the tests in Firefox on Linux.
* One can follow the progress of the tests on https://saucelabs.com/u/wikidata-saucelabs.
* TODO: An email is sent to wikidata-bugs@lists.wikimedia.org when failures occur.

##Manually update a build

Manually updating a Wikidata build requires [composer](http://getcomposer.org/) to be installed on the system.

In the root Wikidata "extension" directory, run:

```bash
composer update -o
```
