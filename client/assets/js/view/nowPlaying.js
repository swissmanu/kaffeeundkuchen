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