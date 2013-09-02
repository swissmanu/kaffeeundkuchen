module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, browserify: {
			basic: {
				src: ['bower_components/angular/angular.min.js', 'src/client/app/*.js']
				, dest: 'tmp/browserified.js'
			}
		}

		, uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			}
			, build: {
				src: 'tmp/browserified.js'
				, dest: 'src/client/public/js/<%= pkg.name %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['browserify', 'uglify']);
};