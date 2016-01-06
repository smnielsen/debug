test:
	@NODE_ENV=test ./node_modules/.bin/mocha ./test/**/*.js --opts ./test/mocha.opts --require ./test/mocha.setup

lint:


test-cov:
	@NODE_ENV=test ./node_modules/.bin/babel-node \
	./node_modules/.bin/isparta cover \
	./node_modules/.bin/_mocha -- --opts ./test/mocha.opts

test-coveralls:
	$(MAKE) test
	@NODE_ENV=test ./node_modules/.bin/babel-node \
	./node_modules/.bin/isparta cover \
	./node_modules/.bin/_mocha --report lcovonly -- -R spec --opts ./test/mocha.opts && \
		cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js || true

.PHONY: test