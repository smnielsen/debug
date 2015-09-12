/**
 * Created by Simon Nielsen
 *
 * This is free to use for anyone
 *
 */
'use strict';

const SMN_DEBUG_NS = 'smn_debug_ns';
let NAMESPACE = 'smn';

let getNS = () => {}, setNS = (ns) => {};
let window = window;
if(window) {
	// CHECK LOCALSTORAGE
	let _storage = window.localStorage;
	if(_storage && _storage.getItem) {
		let ns = _storage.getItem(SMN_DEBUG_NS);
		NAMESPACE = ns || NAMESPACE;
		getNS = () => NAMESPACE;
		setNS = (ns) => {
			_storage.setItem(SMN_DEBUG_NS, ns);
		}
	}
} else if(process && process.env) {
	NAMESPACE = process.env.SMN_DEBUG_NS || NAMESPACE;
	getNS = () => NAMESPACE;
	setNS = (ns) => {
		process.env.SMN_DEBUG_NS = ns;
	}
}

const Debug = require('debug');
/**
 * Available methods:
 *
 * DEFAULT = trace ( use with `debug('logging');` )
 * METHODS = { log, info, warn, error, danger }
 *
 * @param name
 * @returns {Function}
 */
let debug = function(name) {
	name = [NAMESPACE, name].join(':');

	function join(...args) {
		return args.join(':');
	}

	const methods = {
		trace: Debug(join(name, 'trace')),
		log: Debug(join(name, 'debug')),
		info: Debug(join(name, 'info')),
		warn: Debug(join(name, 'warn')),
		error: Debug(join(name, 'error')),
		danger: Debug(join(name, 'DANGER!'))
	};

	const debug = function() {
		methods.trace.apply(this, arguments);
	};

	for(let method in methods) {
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
