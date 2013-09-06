var angular = require('./vendor/angular-shim.js');

(function() {

	function WebsocketService() {
		var instance = {
			primus: undefined
			, subscriptions: {}

			, subscribe: function(topic, callback) {
				if(!this.subscriptions[topic]) {
					this.subscriptions[topic] = [];
				}

				this.subscriptions[topic].push(callback);
			}

			, unsubscribe: function(topic, callback) {
				if(this.subscriptions[topic]) {
					var index = this.subscriptions[topic].indexOf(callback);
					this.subscriptions.splice(index, 1);
				}
			}

			, publish: function(topic, message) {
				var envelope = {
						topic: topic
						, message: message
					};

				console.log('publish: ', envelope);
				this.primus.write(envelope);
			}

			, _init: function init() {
				if(!this.primus) {
					var primus = new Primus('ws://localhost:8080/')
						, self = this;

					primus.on('open', function() {
						this.on('data', self._handleData.bind(self));
					});

					self.primus = primus;
				}
			}

			, _handleData: function handleData(envelope) {
				var topic = envelope.topic || '*'
					, message = envelope.message || envelope;

				console.log('WS: ', topic, message, envelope);

				this.publish(topic, message);
			}
		};

		// As soon as the websocket service gets created the first time, we
		// ensure that a socket to the server is opened.
		instance._init();

		return instance;
	}

	function TrackSearchService($http) {
		var instance = {
			search: function search(query) {
				var promise = $http({
					method: 'POST'
					, url: 'http://localhost:8080/api/search'
					, data: query
				})
				.then(function(response) {
					// Ensure the TrackSearchService only responds with the
					// track information we are interested into.
					return response.data;
				});

				return promise;
			}
		};

		return instance;
	}

	function PlayerService($http) {
		var instance = {
			play: function play(spotifyId) {
				var promise = $http({
					method: 'GET'
					, url: 'http://localhost:8080/api/player/play/' + spotifyId
				})
				.then(function(response) {
					var success = response.data.success || false;
					return success;
				});

				return promise;
			}
		};

		return instance;
	}

	angular.module('kuk.services')
		.factory('websocketService', WebsocketService)
		.factory('trackSearchService', ['$http', TrackSearchService])
		.factory('playerService', ['$http', PlayerService]);

})();