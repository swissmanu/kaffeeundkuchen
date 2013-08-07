TEST_CMD=./node_modules/.bin/mocha --require test/runner.js test/specs/

debug:
	@DEBUG=kaffee* node app/app.js

debug-all:
	@DEBUG=* node app/app.js

lint:
	@./node_modules/.bin/jshint app/

test:
	@$(TEST_CMD) --reporter spec

instrument-for-coverage:
	@jscoverage app app-cov

test-coveralls: instrument-for-coverage
	@KAFFEEUNDKUCHEN_COVERAGE=1 $(TEST_CMD) --reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js app
	@-rm -fr ./app-cov

.PHONY: debug debug-all test test-coveralls lint