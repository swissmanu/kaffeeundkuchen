/** File: config.sample.js
 * Create a copy of this file named "config.js" and modify it to your needs.
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
 module.exports = function() {
	return {
		spotify: {
			username: 'username'
			,password: 'password'
			,appkeyfile: 'config/spotify_appkey.key'	
		}
	};
}