/**
 * Created by Simon Nielsen
 *
 * This is free to use of anyone
 *
 */
'use strict';

var Debug = require('debug');

var SMN_DEBUG_NS = 'smn_debug_ns';
var NAMESPACE = 'smn';

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
		var args = [];
		for(var key in arguments) {
			if(arguments.hasOwnProperty(key)) {
				args.push(arguments[key]);
			}
		}
		return args.join(':');
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

debug.setNS = function(ns) {
	NAMESPACE = ns || NAMESPACE;
};

debug.getNS = function() {
	return NAMESPACE;
};

debug.enable = Debug.enable;
debug.disable = Debug.disable;

module.exports = debug;
