/**
 * Created by sini on 2016-01-06.
 */
'use strict';
import Debug from '../src/index';
import {DEBUG_LEVELS} from '../src/index';


import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

var {expect, assert, should} = chai;

should();
chai.use(sinonChai);

describe('debug wrapper module', () => {

	beforeEach(function() {
		Debug.reset();
	});

	describe('#namespace', () => {
		it("should have default namespace set if not overridden", () => {
			assert.equal(Debug.getNS(), 'smn');
		});
		it("should set old NAMESPACE if setNS is called with invalid string", () => {
			Debug.setNS();

			assert.equal(Debug.getNS(), 'smn');
		});
	});

	describe('#enabling', () => {
		beforeEach(() => {
			Debug.reset();
		});

		it("should be disabled if not enabled", () => {
			var debug = Debug('test');
			expect(debug.enabled).to.equal(false);
		});

		it('should have mocked functions if not enabled', () => {
			var debug = Debug('test');

			expect(debug.toString().indexOf('wrapper')).to.equal(-1);
			expect(debug.trace.toString().indexOf('wrapper')).to.equal(-1);
			expect(debug.log.toString().indexOf('wrapper')).to.equal(-1);
			expect(debug.info.toString().indexOf('wrapper')).to.equal(-1);
			expect(debug.debug.toString().indexOf('wrapper')).to.equal(-1);
			expect(debug.warn.toString().indexOf('wrapper')).to.equal(-1);
			expect(debug.error.toString().indexOf('wrapper')).to.equal(-1);
			expect(debug.danger.toString().indexOf('wrapper')).to.equal(-1);
		});

		it("should be enabled if enabled", () => {
			Debug.enable('smn:*');

			var debug = Debug('test');
			expect(debug.enabled).to.equal(true);
		});
	});

	describe('#debug levels', () => {
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

	describe('#actual logging', () => {
		var debug;
		beforeEach(() => {
			Debug.enable('smn:*');
			debug = Debug('test-log');
		});

		it('should have default logging methods set to trace', () => {
			var func = debug('test');
			expect(func.namespace.endsWith(DEBUG_LEVELS.TRACE)).to.equal(true);
		});

		it('should print string "unknown" if no input if argument is undefined', () => {
			sinon.spy(debug, 'info');

			var undefinedVariable = undefined;
			debug.info('something %s', undefinedVariable);

			expect(debug.info).to.have.been.called;
		});
	});

});

