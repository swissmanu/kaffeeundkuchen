/** File: app.js
 * The main application logic of kaffeeundkuchen.
 *
 */
var kaffeeundkuchen = kaffeeundkuchen || {
    model: {}
    ,collection: {}
    ,template: {}
    ,view: {}
};

/** Class: model.Track
 */
kaffeeundkuchen.model.Track = Backbone.Model.extend();

/** Class: collection.Tracks
 *
 */
kaffeeundkuchen.collection.Tracks = Backbone.Collection.extend({
    model: kaffeeundkuchen.model.Track
});


/** Class: template.NowPlaying
 *
 */
kaffeeundkuchen.template.NowPlaying = Handlebars.compile(
	'<header class="bar-title">' +
	'  <div class="header-animated">' + 
	'  <h1 class="title">Now Playing</h1>' +
	'  <a class="button-playlist button-next">Playlist</a>' +
	'</header>');

/** Class: view.NowPlaying
 *
 */
kaffeeundkuchen.view.NowPlaying = Jr.View.extend({
    render: function render() {
        this.$el.html(kaffeeundkuchen.template.NowPlaying);
        return this;
    }

    ,events: {
        'click .button-playlist': 'onClickButtonPlaylist'
    }

    ,onClickButtonPlaylist: function() {
        Jr.Navigator.navigate('playlist', {
            trigger: true
            ,animation: {
                type: Jr.Navigator.animations.SLIDE_OVER
                ,direction: Jr.Navigator.directions.LEFT
            }
        });
    }
});

/** Class: template.Playlist
 *
 */
kaffeeundkuchen.template.Playlist = Handlebars.compile(
	'<header class="bar-title">' +
	'  <div class="header-animated">' +
	'  <a class="button-nowplaying button-prev">Now Playing</a>' +
	'  <h1 class="title">Playlist</h1>' +
	'  <a class="button button-addtrack">Add Track</a>' +
	'</header>' +
	'<div class="content">' +
	'<ol class="list playlist" />' +
	'</div>');

/** Class: template.PlaylistItem
 *
 */
kaffeeundkuchen.template.PlaylistItem = Handlebars.compile(
    '<li class="item">' +
    '  <div class="clearfix"><img src="{{artwork}}" class="artwork">' +
    '  <div class="info">' +
    '    <h2 class="artist">{{artist}}</h2>' +
    '    <h1 class="track">{{track}}</h1>' +
    '  </div></div>' +
    '</li>');

/** Class: view.Playlist
 *
 */
kaffeeundkuchen.view.Playlist = Jr.View.extend({

    initialize: function initialize() {
        // Create some dummy data:
        var models = [];
        for(var i = 0; i < 3; i++) {
            models.push(new kaffeeundkuchen.model.Track({artist:'Hans Zimmer',track:'Dream is Collapsing ' + i,spotifyId:'balablala',artwork:'images/demoartwork.jpg'}));
        }
        this.model = new kaffeeundkuchen.collection.Tracks(models);

        // Step 1: Listen on changes in model to rerender the subvies
        this.model.on('change add remove', this.renderItems.bind(this));


    }

	,render: function render() {
		this.$el.html(kaffeeundkuchen.template.Playlist());
        this.renderItems();

		return this;
	}

    ,renderItems: function renderItems() {
        var rendered = '<li class="list-divider">Next Up...</li>';
        
        this.model.forEach(function(track) {
            rendered += kaffeeundkuchen.template.PlaylistItem({
                artist: track.get('artist')
                ,track: track.get('track')
                ,artwork: 'images/demoartwork.jpg'
            });
        });

        $('.playlist', this.$el).html(rendered);
    }

	,events: {
		'click .button-nowplaying': 'onClickButtonNowPlaying'
        ,'click .button-addtrack': 'onClickButtonAddTrack'
	}

	,onClickButtonNowPlaying: function onClickButtonNowPlaying() {
		Jr.Navigator.navigate('nowPlaying', {
			trigger: true
			,animation: {
				type: Jr.Navigator.animations.SLIDE_OVER
				,direction: Jr.Navigator.directions.RIGHT
			}
		});
	}

    ,onClickButtonAddTrack: function onClickButtonAddTrack() {
        this.model.add(
            new kaffeeundkuchen.model.Track({artist:'Willy',track:'Another One',spotifyId:'balablala'})
        )
    }
});

/** Class: AppRouter
 *
 */
kaffeeundkuchen.AppRouter = Jr.Router.extend({
	routes: {
		'': 'playlist'
		,'playlist': 'playlist'
		,'nowPlaying': 'nowPlaying'
		,'searchTrack': 'searchTrack'
	}

	,playlist: function playlist() {
		var playlistView = new kaffeeundkuchen.view.Playlist();
		this.renderView(playlistView);
	}

	,nowPlaying: function nowPlaying() {
		var nowPlayingView = new kaffeeundkuchen.view.NowPlaying();
		this.renderView(nowPlayingView);
	}
});


var appRouter = new kaffeeundkuchen.AppRouter();
Backbone.history.start();