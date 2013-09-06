var $ = require('./zepto-shim');

(function() {
	$(function() {
		$('.navbar .toggle').on('click', function(e) {
			var navbar = $('.navbar ul');

			navbar.toggleClass('active');

			if(navbar.hasClass('active')) {
				$('.navbar ul a').on('click', function() {
					navbar.removeClass('active');
				});
			}

			e.preventDefault();
			return false;
		});
	});
})();