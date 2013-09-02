module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, browserify: {
			build: {
				src: [
					'bower_components/angular/angular.min.js'
					, 'src/client/app/**/*.js']
				, dest: 'tmp/client-browserified.js'
			}
		}

		, concat: {
			'tmp/concat.js': [
				'node_modules/engine.io-client/engine.io.js'
				, 'tmp/client-browserified.js'
			]
		}

		, uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			}

			, build: {
				src: 'tmp/concat.js'
				, dest: 'src/client/public/js/<%= pkg.name %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat')

	grunt.registerTask('default', ['browserify', 'concat', 'uglify']);
};