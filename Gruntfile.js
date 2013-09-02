module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, browserify: {
			basic: {
				src: ['src/client/app/*.js']
				, dest: 'browserified.js'
			}
			, options: {
				noParse: ['src/client/app/vendor/angular/*.js']
			}
		}

		, uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			}
			, build: {
				src: 'browserified.js'
				, dest: 'src/client/public/js/<%= pkg.name %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['browserify', 'uglify']);
};