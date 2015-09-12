/**
 * Created by Simon Nielsen
 *
 * This is free to use for anyone
 *
 */
'use strict';

var SMN_DEBUG_NS = 'smn_debug_ns';
var NAMESPACE = 'smn';

var emptyFunc = function() {};

var getNS = emptyFunc, setNS = emptyFunc;
var window = window;
if(window) {
	// CHECK LOCALSTORAGE
	var _storage = window.localStorage;
	if(_storage && _storage.getItem) {
		var ns = _storage.getItem(SMN_DEBUG_NS);
		NAMESPACE = ns || NAMESPACE;
		getNS = function() { return NAMESPACE; };
		setNS = function(ns) { _storage.setItem(SMN_DEBUG_NS, ns); }
	}
} else if(process && process.env) {
	NAMESPACE = process.env.SMN_DEBUG_NS || NAMESPACE;
	getNS = function() { return NAMESPACE; };
	setNS = function(ns) { process.env.SMN_DEBUG_NS = ns; }
}

var Debug = require('debug');
/**
 * Available methods:
 *
 * DEFAULT = trace ( use with `debug('logging');` )
 * METHODS = { log, info, warn, error, danger }
 *
 * @param name
 * @returns {Function}
 */
var debug = function(name) {
	name = [NAMESPACE, name].join(':');

	function join() {
		return arguments.join(':');
	}

	var methods = {
		trace: Debug(join(name, 'trace')),
		log: Debug(join(name, 'debug')),
		info: Debug(join(name, 'info')),
		warn: Debug(join(name, 'warn')),
		error: Debug(join(name, 'error')),
		danger: Debug(join(name, 'DANGER!'))
	};

	var debug = function() {
		methods.trace.apply(this, arguments);
	};

	for(var method in methods) {
		if(methods.hasOwnProperty(method)) {
			debug[method] = methods[method];
		}
	}

	return debug;
};

debug.setNS = setNS;
debug.getNS = getNS;
debug.enable = Debug.enable;
debug.disable = Debug.disable;

export default debug;
