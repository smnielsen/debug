/**
 * Created by sini on 2016-01-06.
 */
'use strict';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

var {expect, assert, should} = chai;

should();
chai.use(sinonChai);

import Debug from '../src/index';
import {DEBUG_LEVELS} from '../src/index';

describe('debug wrapper module', () => {

	beforeEach(function() {
		Debug.reset();
	});

	it("should have default namespace set if not overridden", () => {
		assert.equal(Debug.getNS(), 'smn');
	});

	it("should be disabled if not enabled", () => {
		var debug = Debug('test');
		expect(debug.enabled).to.equal(false);
	});

	it("should be enabled if enabled", () => {
		Debug.enable('smn:*');

		var debug = Debug('test');
		expect(debug.enabled).to.equal(true);
	});

	it("should have trace as default DEBUG_LEVEL", () => {
		Debug.enable('smn:*');

		var debug = Debug('test');
		expect(debug.trace.enabled).to.equal(true);
	});

	it("should not enable trace method if DEBUG_LEVEL is set to higher than trace", () => {
		Debug.enable('smn:*');
		Debug.setLevel(DEBUG_LEVELS.INFO);

		var debug = Debug('test');
		expect(debug.trace.enabled).not.to.equal(true);
		expect(debug.info.enabled).to.equal(true);
	});

});

