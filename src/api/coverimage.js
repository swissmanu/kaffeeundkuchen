var debug = require('debug')('kaffeeundkuchen.api.coverimage');

function sanitizeSize(size) {
	var sanitized = size;

	if(!sanitized || (sanitized !== 'small' &&
		sanitized !== 'large' && sanitized !== 'normal')) {
		sanitized = 'normal';
	}

	return sanitized;
}

function coverImageFunctionForSize(size, album) {
	var coverImageFunction;

	if(size === 'small') {
		coverImageFunction = album.smallCoverImage;
	} else if(size === 'large') {
		coverImageFunction = album.largeCoverImage;
	} else {
		coverImageFunction = album.coverImage;
	}

	return coverImageFunction;
}


function handleRequest(req, res) {
	debug('handle cover image request');

	var spotifyWrapper = req.app.get('spotifyWrapper')
		, spotifyId = req.params.trackid
		, spotifyTrack = spotifyWrapper.getCachedTrack(spotifyId)
		, size = sanitizeSize(req.params.size);

	if(spotifyTrack) {
		var album = spotifyTrack.album
			, coverImageFunction = coverImageFunctionForSize(size, album);

		coverImageFunction.call(album, function(buffer) {
			if(buffer.length > 0) {
				debug('received cover image');
				res.set('Content-Type', 'image/jpeg');
				res.send(buffer);
			} else {
				debug('received empty image');
				res.send(404);
			}
		});
	} else {
		res.send(404);
	}
}

module.exports = handleRequest;