(function(templates) {
/** File: app.js
 * The main application logic of kaffeeundkuchen.
 *
 */
var kaffeeundkuchen = kaffeeundkuchen || {
    model: {}
    ,collection: {}
    ,template: templates
    ,view: {}
    ,vent: _.extend({}, Backbone.Events)  // app event aggregator
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
            return $('#txtArtist').val();
        }

        ,getTrack: function getTrack() {
            return $('#txtTrack').val();
        }
    }

    ,onClickBtnSearch: function onClickBtnSearch() {
        var self = this
            ,model = self.model
            ,artist = self.form.getArtist()
            ,track = self.form.getTrack();

        overlay.showActivityIndicator('Searching...');

        model.set('artist', artist);
        model.set('track', track);

        $.post('api/search', {artist:artist,track:track}, function(response) {
            var models = [];
            response.forEach(function(rawTrack) {
                models.push(new kaffeeundkuchen.model.Track(rawTrack));
            });

            var resultCollection = new kaffeeundkuchen.collection.Tracks(models);
            dataStore.searchResult = resultCollection;

            /*
            Jr.Navigator.navigate('addTrack', {
                trigger: true
                ,animation: {
                    type: Jr.Navigator.animations.SLIDE_OVER
                    ,direction: Jr.Navigator.directions.LEFT
                }
            });
            */

            kaffeeundkuchen.vent.trigger('display:searchresults', resultCollection);

            overlay.hide();
        }, 'json');
    }

    ,onClickBtnCancel: function onClickBtnCancel() {
        this.model.clear();

        Jr.Navigator.navigate('playlist', {
            trigger: true
            ,animation: {
                type: Jr.Navigator.animations.SLIDE_OVER
                ,direction: Jr.Navigator.directions.DOWN
            }
        });
    }
});

/** Class: view.AddTrack
 *
 */
kaffeeundkuchen.view.AddTrack = Jr.View.extend({
    render: function render() {
        this.$el.html(kaffeeundkuchen.template.AddTrack());
        this.renderItems();

        return this;
    }

    ,renderItems: function renderItems() {
        var rendered = '';
        
        this.model.models.forEach(function(track) {
            rendered += kaffeeundkuchen.template.SearchResultItem(track.toJSON());
        });

        $('.searchresults', this.$el).html(rendered);
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


kaffeeundkuchen.vent.on('display:searchresults', function(searchResults) {

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

    ,initialize: function initialize() {
        this.views = {};
        this.views.playlist = new kaffeeundkuchen.view.Playlist();
        this.views.newPlaying = new kaffeeundkuchen.view.NowPlaying();
        this.views.searchTrack = new kaffeeundkuchen.view.SearchTrack();
        this.views.addTrack = new kaffeeundkuchen.view.AddTrack();
    }



	,playlist: function playlist() {
		this.renderView(this.views.playlist);
	}

	,nowPlaying: function nowPlaying() {
		this.renderView(this.views.nowPlaying);
	}

    ,searchTrack: function searchTrack() {
        this.renderView(this.views.searchTrack);
    }

    ,addTrack: function addTrack() {
        this.renderView(this.views.addTrack);
    }
});


var appRouter = new kaffeeundkuchen.AppRouter();
var overlay = new kaffeeundkuchen.view.Overlay();
var dataStore = {};

Backbone.history.start();
})(templates);