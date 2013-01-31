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
	'  <a class="btnNowPlaying button-prev">Now Playing</a>' +
	'  <h1 class="title">Playlist</h1>' +
	'  <a class="button btnAddTrack">Add Track</a>' +
	'</header>' +
	'<div class="content">' +
	'<ol class="list playlist" />' +
	'</div>');

/** Class: template.PlaylistItem
 *
 */
kaffeeundkuchen.template.PlaylistItem = Handlebars.compile(
    '<li class="item">' +
    '  <div class="clearfix">' +
    '    <img src="{{artwork}}" class="artwork">' +
    '    <div class="info">' +
    '      <h2 class="artist">{{artist}}</h2>' +
    '      <h1 class="track">{{track}}</h1>' +
    '    </div>' +
    '    <a class="button-positive btnVote" data-spotifyid="{{spotifyId}}">Vote!</a>' +
    '  </div>' +
    '</li>');

/** Class: view.Playlist
 *
 */
kaffeeundkuchen.view.Playlist = Jr.View.extend({

    initialize: function initialize() {
        // Create some dummy data:
        var models = [];
        for(var i = 0; i < 3; i++) {
            models.push(new kaffeeundkuchen.model.Track({artist:'Hans Zimmer',track:'Dream is Collapsing ' + i,spotifyId:'balablala'+i,artwork:'images/demoartwork.jpg'}));
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
        var rendered = '';
        
        this.model.forEach(function(track) {
            rendered += kaffeeundkuchen.template.PlaylistItem(track.toJSON());
        });

        $('.playlist', this.$el).html(rendered);
    }

	,events: {
		'click .btnNowPlaying': 'onClickBtnNowPlaying'
        ,'click .btnAddTrack': 'onClickBtnAddTrack'
        ,'click .btnVote': 'onClickBtnVote'
	}

	,onClickBtnNowPlaying: function onClickBtnNowPlaying() {
		Jr.Navigator.navigate('nowPlaying', {
			trigger: true
			,animation: {
				type: Jr.Navigator.animations.SLIDE_OVER
				,direction: Jr.Navigator.directions.RIGHT
			}
		});
	}

    ,onClickBtnAddTrack: function onClickBtnAddTrack() {
        this.model.add(
            new kaffeeundkuchen.model.Track({artist:'Willy',track:'Another One',spotifyId:'balablala ADDED'})
        )
    }

    ,onClickBtnVote: function onClickBtnVote(event) {
        var spotifyId = $(event.srcElement).attr('data-spotifyid');
        console.log('Vote for ', spotifyId);
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