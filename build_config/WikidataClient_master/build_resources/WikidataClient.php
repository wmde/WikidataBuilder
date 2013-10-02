<?php

if ( !is_readable( __DIR__ . '/vendor/autoload.php' ) ) {
	die( 'y u no run the build script?' );
}

include_once( __DIR__ . '/vendor/autoload.php' );