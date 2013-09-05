describe('AirplayBrowser', function() {

	var utils = requireAppFile('utils')
		, airplaybrowser = new utils.AirplayBrowser();

	describe('events', function() {
		var raopad = require('../mocks/raop-mdns');

		before(function() {
			airplaybrowser.start();
		});

		after(function() {
			airplaybrowser.stop();
		});

		describe('"discovered" event', function() {
			it('should fire as a new target was found', function(done) {
				airplaybrowser.once('discovered', function() {
					raopad.stop();

					// Actually testing "disappeared" here too, but we need to
					// wait until the airplay target disappeared from the
					// browsers radar or following tests will fail.
					airplaybrowser.once('disappeared', function() {
						done();
					});
				});

				raopad.start();
			});
		});

		describe('"disappered" event', function() {
			it('should fire as a target disappeared', function(done) {
				airplaybrowser.once('discovered', function() {
					raopad.stop();
				});
				airplaybrowser.once('disappeared', function() {
					done();
				});

				raopad.start();
			});
		});

	});

});