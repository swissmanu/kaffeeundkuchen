TEST_CMD=./node_modules/.bin/mocha --require test/runner.js test/specs/

debug:
	@DEBUG=kaffee* node src/app.js

debug-all:
	@DEBUG=* node src/app.js

lint:
	@./node_modules/.bin/jshint src/

test:
	@$(TEST_CMD) --reporter spec

instrument-for-coverage:
	@jscoverage src src-cov

test-coveralls: instrument-for-coverage
	@KAFFEEUNDKUCHEN_COVERAGE=1 $(TEST_CMD) --reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js src
	@-rm -fr ./src-cov

.PHONY: debug debug-all test test-coveralls lint