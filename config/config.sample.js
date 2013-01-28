/** File: config.sample.js
 * Create a copy of this file named "config.js" and modify it to your needs.
 *
 * Server:
 * Port:
 *  On which network port should the KaffeeUndKuchen server be listening fot
 *  connections?
 * announceWithBonjour:
 *  Should the KaffeeUndKuchen server be announced using Bonjour in the local
 *  network?
 *
 * Spotify Settings:
 * This section contains all stuff related to Spotify. Login to spotify.com and
 * make sure you have a Spotify premium account.
 *
 * Username & Password:
 *  https://www.spotify.com/ch-de/account/set-device-password/
 *  If not already done, you have to create a device password to use
 *  Spotify with KaffeeUndKuchen. Follow the instructions on that page
 *  and paste the regarding username and device password below.
 * App Key:
 *  https://developer.spotify.com/technologies/libspotify/keys/
 *  Apply for an app key and download the binary version of it. Place it
 *  in a proper place and make sure "appkeyfile" referes to that file.
 */
var config = {
	server: {
		port: 80
		,announceWithBonjour: true
	}
	,spotify: {
		username: 'username'
		,password: 'password'
		,appKeyFile: 'config/spotify_appkey.key'
		,maxResults: 20
	}
};

module.exports = config;