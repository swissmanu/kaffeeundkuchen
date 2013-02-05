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
        Jr.Navigator.navigate('searchTrack', {
            trigger: true
            ,animation: {
                type: Jr.Navigator.animations.SLIDE_OVER
                ,direction: Jr.Navigator.directions.UP
            }
        });
    }

    ,onClickBtnVote: function onClickBtnVote(event) {
        var spotifyId = $(event.srcElement).attr('data-spotifyid');
        console.log('Vote for ', spotifyId);
    }
});

/** Class: template.SearchTrack
 *
 */
kaffeeundkuchen.template.SearchTrack = Handlebars.compile(
    '<header class="bar-title">' +
    '  <div class="header-animated">' +
    '    <a class="button btnCancel">Cancel</a>' +
    '    <h1 class="title">Add Track</h1>' +
    '    <a class="button btnSearch">Search</a>' +
    '  </div>' + 
    '</header>' +
    '<div class="content">' +
    '  <form>' +
    '    <div class="input-group">' +
    '      <div class="input-row">' +
    '        <label for="txtArtist">Artist</label>' +
    '        <input type="text" name="txtArtist" id="txtArtist" />' +
    '      </div>' +
    '      <div class="input-row">' +
    '        <label for="txtTrack">Track</label>' +
    '        <input type="text" name="txtTrack" id="txtTrack" />' +
    '      </div>' +
    '    </div>' +
    '  </form>' +
    '  <p class="hint">Enter at least an artist or track name and tap "Search" in the top right corner.</p>' +
    '</div>');

/** Class: view.SearchTrack
 *
 */
kaffeeundkuchen.view.SearchTrack = Jr.View.extend({
    render: function render() {
        this.$el.html(kaffeeundkuchen.template.SearchTrack);
        return this;
    }

    ,events: {
        'click .btnCancel': 'onClickBtnCancel'
        ,'click .btnSearch': 'onClickBtnSearch'
    }

    ,form: {
        getArtist: function getArtist() {
            var artist = $('input#txtArtist').val();
            return artist;
        }
        ,getTrack: function getTrack() {
            var track =  $('input#txtTrack').val();
            return track;
        }
    }

    ,onClickBtnCancel: function onClickBtnCancel() {
        Jr.Navigator.navigate('playlist', {
            trigger: true
            ,animation: {
                type: Jr.Navigator.animations.SLIDE_OVER
                ,direction: Jr.Navigator.directions.DOWN
            }
        });
    }

    ,onClickBtnSearch: function onClickBtnSearch() {
        var artist = this.form.getArtist()
            ,track = this.form.getTrack();

        overlay.showActivityIndicator('Searching...');

        $.post('api/search', {artist:artist,track:track}, function(response) {
            overlay.hide();
            console.log(response);
        });

        /*
        Jr.Navigator.navigate('addTrack', {
            trigger: true
            ,animation: {
                type: Jr.Navigator.animations.SLIDE_OVER
                ,direction: Jr.Navigator.directions.LEFT
            }
        });
        */
    }
});


/** Class: template.AddTrack
 *
 */
kaffeeundkuchen.template.AddTrack = Handlebars.compile(
    '<header class="bar-title">' +
    '  <div class="header-animated">' +
    '    <a class="button-prev btnBack">Search</a>' +
    '    <h1 class="title">Add Track</h1>' +
    '    <a class="button btnAdd">Add</a>' +
    '  </div>' + 
    '</header>' +
    '<div class="content">' +
    'bla' +
    '</div>');

/** Class: view.AddTrack
 *
 */
kaffeeundkuchen.view.AddTrack = Jr.View.extend({
    render: function render() {
        this.$el.html(kaffeeundkuchen.template.AddTrack);
        return this;
    }

    ,events: {
        'click .btnBack': 'onClickBtnBack'
        ,'click .btnAdd': 'onClickBtnAdd'
    }

    ,onClickBtnBack: function onClickBtnBack() {
        Jr.Navigator.navigate('searchTrack', {
            trigger: true
            ,animation: {
                type: Jr.Navigator.animations.SLIDE_OVER
                ,direction: Jr.Navigator.directions.RIGHT
            }
        });
    }

    ,onClickBtnAdd: function onClickBtnAdd() {
        Jr.Navigator.navigate('playlist', {
            trigger: true
            ,animation: {
                type: Jr.Navigator.animations.SLIDE_OVER
                ,direction: Jr.Navigator.directions.DOWN
            }
        });
    }
});


kaffeeundkuchen.view.Overlay = Backbone.View.extend({

    POPUPTYPE: {
        SUCCESS : {
            icon: 'icon-ok'
            ,delay: 1000
            ,defaultMessage: 'Done'
        }
        ,ERROR : {
            icon: 'icon-exclamation-sign'
            ,delay: 2500
            ,defaultMessage: 'Error :('
        }
    }

    ,spinnerColor: 'white'

    ,initialize: function(options) {
        var self = this
            ,overlay = $('#overlay');

        self.overlay = overlay;
        self.spinner = new Spinner({color:self.spinnerColor});
    }

    ,showActivityIndicator: function showActivityIndicator(message) {
        var overlay = this.overlay
            ,indicatorContainer = $('.indicator', overlay)
            ,messageContainer = $('.text', overlay)
            ,message = message || 'Please Wait';

        indicatorContainer.empty().append(this.spinner.spin().el);
        messageContainer.empty().append(message);

        this.overlay.show();
    }

    ,showStatusPopup: function showStatusPopup(type, message) {
        var overlay = this.overlay
            ,indicatorContainer = $('.indicator', overlay)
            ,messageContainer = $('.text', overlay)
            ,icon = type.icon || 'icon-comment'
            ,message = message || type.defaultMessage || ''
            ,delay = type.delay || 2000;

        this.spinner.stop();  // just to be sure ;)
        indicatorContainer.empty().append('<div class="' + icon + ' popup-icon"></div>');
        messageContainer.empty().append(message);

        this.overlay.show();
        this.overlay.delay(delay).fadeOut('fast');
    }

    ,hide: function hide() {
        var overlay = this.overlay
            ,spinner = this.spinner;

        overlay.animate({
            opacity: 0
        }, 500, 'ease', function() {
            overlay.hide();
            overlay.css('opacity',1);
            spinner.stop();
        });
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
        ,'addTrack': 'addTrack'
	}

	,playlist: function playlist() {
		var playlistView = new kaffeeundkuchen.view.Playlist();
		this.renderView(playlistView);
	}

	,nowPlaying: function nowPlaying() {
		var nowPlayingView = new kaffeeundkuchen.view.NowPlaying();
		this.renderView(nowPlayingView);
	}

    ,searchTrack: function searchTrack() {
        var searchTrack = new kaffeeundkuchen.view.SearchTrack();
        this.renderView(searchTrack);
    }

    ,addTrack: function addTrack() {
        var addTrack = new kaffeeundkuchen.view.AddTrack();
        this.renderView(addTrack);
    }
});


var appRouter = new kaffeeundkuchen.AppRouter();
var overlay = new kaffeeundkuchen.view.Overlay();
Backbone.history.start();