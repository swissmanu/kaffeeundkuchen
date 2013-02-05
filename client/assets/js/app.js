/**
 * Defines the application namespaces
 */
var kaffeeundkuchen = kaffeeundkuchen || {
    model: {}
    ,collection: {}
    ,template: templates
    ,view: {}
    ,vent: _.extend({}, Backbone.Events)  // app event aggregator    
};

/**
 * Fires the application as soon as everything's ready.
 */
$(document).ready(function() {
    var appRouter = new kaffeeundkuchen.AppRouter();
    var overlay = new kaffeeundkuchen.view.Overlay();
    var dataStore = {};

    Backbone.history.start();
});