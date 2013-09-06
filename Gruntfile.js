module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, browserify: {
			build: {
				src: [
					'src/client/app/**/*.js'
				]
				, dest: 'tmp/js/client-browserified.js'
			}
		}

		, concat: {
			build: {
				src: [
					'tmp/js/primus.js'
					, 'tmp/js/client-browserified.js'
				]
				, dest: 'tmp/js/concat.js'
			}
			, dev: {
				src: [
					'tmp/js/primus.js'
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

		, shell: {
			options: {
				stdout: true
				, stderr: true
			}

			, debug: {
				command: 'DEBUG=kaffeeundkuchen.* npm start'
			}
			, jshint: {
				command: './node_modules/.bin/jshint src/'
			}
			, test: {
				command: './node_modules/.bin/mocha --timeout 8000 --require test/runner.js test/specs/ --reporter spec'
			}
			, instrumentForCoverage: {
				command: 'jscoverage src src-cov'
			}
			, testCoveralls: {
				command: 'KAFFEEUNDKUCHEN_COVERAGE=1 ./node_modules/.bin/mocha --timeout 8000 --require test/runner.js test/specs/ --reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js src && rm -fr ./src-cov'
			}

		}
	});

	/** Task: preparePrimus
	 * Creates an instance of the Primus websocket wrapper and saves its client
	 * libary into a temporary file `tmp/js/primus.js` which then can be taken
	 * further for packaging.
	 */
	grunt.registerTask('preparePrimus', function() {
		var Primus = require('primus')
			, httpServer = require('http').Server
			, PrimusResponder = require('primus-responder')
			, primus = new Primus(new httpServer(), { transformer: 'sockjs' });

		primus.use('responder', PrimusResponder);
		grunt.file.write('tmp/js/primus.js', primus.library());
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('debug', [
		'browserify', 'preparePrimus', 'concat:dev', 'sass', 'shell:debug'
	]);
	grunt.registerTask('test', [
		'shell:test'
	]);
	grunt.registerTask('test-coveralls', [
		'shell:instrumentForCoverage', 'shell:testCoveralls'
	])
	grunt.registerTask('lint', [
		'shell:jshint'
	]);

	grunt.registerTask('default', [
		'browserify', 'preparePrimus', 'concat:build', 'uglify', 'sass'
	]);


};
