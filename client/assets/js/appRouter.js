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