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