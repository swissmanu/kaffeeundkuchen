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