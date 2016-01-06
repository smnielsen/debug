/**
 * Created by Simon Nielsen
 *
 * This is free to use of anyone
 *
 */
'use strict';

var Debug = require('debug');

var NAMESPACE = 'smn';

/**
 * MOCKED DEBUG MODULE
 * @constructor
 */
var MOCKED_DEBUG = () => {};
MOCKED_DEBUG.trace = () => {};
MOCKED_DEBUG.log = () => {};
MOCKED_DEBUG.debug = () => {};
MOCKED_DEBUG.info = () => {};
MOCKED_DEBUG.warn = () => {};
MOCKED_DEBUG.error = () => {};
MOCKED_DEBUG.danger = () => {};

MOCKED_DEBUG.namespace = '';
MOCKED_DEBUG.enabled = false;
MOCKED_DEBUG.enable = Debug.enable;
MOCKED_DEBUG.disable = Debug.disable;

/**
 * SETTER AND GETTER FOR NAMESPACE
 * Always do this in beginning of application
 */
function setNS(ns) {
	NAMESPACE = ns || NAMESPACE;
}

function getNS() {
	return NAMESPACE;
}

/**
 * SET LEVEL OF DEBUG
 */
const DEBUG_LEVELS = {
	TRACE: 'trace',
	DEBUG: 'debug',
	INFO: 'info',
	WARN: 'warn',
	ERROR: 'error',
	DANGER: 'danger'
};

var DEBUG_LEVEL = DEBUG_LEVELS.TRACE;

function setLevel(l) {
	var ll = DEBUG_LEVELS[l.toUpperCase()];
	if(ll) {
		DEBUG_LEVEL = ll;
	}
	return DEBUG_LEVEL;
}
/**
 * Available methods:
 *
 * DEFAULT = trace ( use with `debug('logging');` )
 * METHODS = { log, info, warn, error, danger }
 *
 * @param name
 * @returns {Function}
 */
var DebugModule = function(name) {
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

	/* Wrapper methods for immutablejs package */
	var wrapperDebug = function(method) {
		var wrapper = function() {
			var args = [];
			for(var i in arguments) {
				if(arguments[i] !== undefined) {
					args.push(arguments[i].toJS ? arguments[i].toJS() : arguments[i]);
				} else {
					args.push('unknown');
				}
			}
			method.apply(this, args);
		};
		wrapper.enabled = true;
		wrapper.namespace = method.namespace;
		return wrapper;
	};

	/* Set up methods for debugging according to DEBUG_LEVEL */
	var methods = {};

	var debugLevelActive = false;
	for(var key in DEBUG_LEVELS) {
		if(DEBUG_LEVELS.hasOwnProperty(key)) {
			var level = DEBUG_LEVELS[key];
			if(level === DEBUG_LEVEL) {
				debugLevelActive = true;
			}
			/* Set method depending on active level */
			if(debugLevelActive) {
				methods[level] = wrapperDebug(Debug(join(name, level)));
				methods[level].enabled = true;
			} else {
				methods[level] = MOCKED_DEBUG[level];
			}
		}
	}

	var defaultDebugMethod = function() {
		methods[DEBUG_LEVELS.TRACE].apply(this, arguments);
		return methods[DEBUG_LEVELS.TRACE];
	};

	if(Debug.enabled(methods[DEBUG_LEVEL].namespace) === false) {
		return MOCKED_DEBUG;
	}

	methods.log = methods[DEBUG_LEVELS.DEBUG];
	methods.enabled = true;

	return Object.assign(defaultDebugMethod, methods);
};

DebugModule.reset = () => {
	NAMESPACE = 'smn';
	DEBUG_LEVEL = DEBUG_LEVELS.TRACE;
	Debug.disable();

	return this;
};

DebugModule.enabled = Debug.enabled;
DebugModule.enable = Debug.enable;
DebugModule.disable = Debug.disable;
DebugModule.setNS = setNS;
DebugModule.getNS = getNS;
DebugModule.setLevel = setLevel;

export {DEBUG_LEVELS};

export default DebugModule;
