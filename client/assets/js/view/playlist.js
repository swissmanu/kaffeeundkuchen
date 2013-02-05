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