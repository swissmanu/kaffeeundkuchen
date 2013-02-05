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