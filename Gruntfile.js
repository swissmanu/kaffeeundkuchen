var path = require

// TODO grunt install task which runs npm install, bower install and angular-latest build

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, browserify: {
			build: {
				src: [
					'bower_components/angular-latest/build/angular.min.js'
					, 'src/client/app/**/*.js']
				, dest: 'tmp/js/client-browserified.js'
			}
		}

		, concat: {
			build: {
				src: [
					'node_modules/engine.io-client/engine.io.js'
					, 'tmp/js/client-browserified.js'
				]
				, dest: 'tmp/js/concat.js'
			}
			, dev: {
				src: [
					'node_modules/engine.io-client/engine.io.js'
					, 'tmp/js/client-browserified.js'
				]
				, dest: 'src/client/public/js/<%= pkg.name %>.min.js'
			}

		}

		, uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			}

			, build: {
				src: 'tmp/js/concat.js'
				, dest: 'src/client/public/js/<%= pkg.name %>.min.js'
			}
		}

		, sass: {
			options: {
				cacheLocation: 'tmp/sass-cache'
				, style: 'compressed'
			}

			, build: {
				files: {
					'src/client/public/css/<%= pkg.name %>.css': 'src/client/sass/main.scss'
					, 'src/client/public/css/font-awesome.css': 'src/client/sass/fontawesome/font-awesome.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['browserify', 'concat:build', 'uglify', 'sass']);
	grunt.registerTask('dev', ['browserify', 'concat:dev', 'sass']);
};