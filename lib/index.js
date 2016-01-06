/**
 * Created by Simon Nielsen
 *
 * This is free to use of anyone
 *
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Debug = require('debug');

var NAMESPACE = 'smn';

/**
 * MOCKED DEBUG MODULE
 * @constructor
 */
var MOCKED_DEBUG = function MOCKED_DEBUG() {};
MOCKED_DEBUG.trace = function () {};
MOCKED_DEBUG.log = function () {};
MOCKED_DEBUG.debug = function () {};
MOCKED_DEBUG.info = function () {};
MOCKED_DEBUG.warn = function () {};
MOCKED_DEBUG.error = function () {};

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
var DEBUG_LEVELS = {
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
	if (ll) {
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
var DebugModule = function DebugModule(name) {
	name = [NAMESPACE, name].join(':');

	function join() {
		var args = [];
		for (var key in arguments) {
			if (arguments.hasOwnProperty(key)) {
				args.push(arguments[key]);
			}
		}
		return args.join(':');
	}

	/* Wrapper methods for immutablejs package */
	var wrapperDebug = function wrapperDebug(method) {
		var wrapper = function wrapper() {
			var args = [];
			for (var i in arguments) {
				if (arguments[i] !== undefined) {
					args.push(arguments[i].toJS ? arguments[i].toJS() : arguments[i]);
				} else {
					args.push('undefined');
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
	for (var key in DEBUG_LEVELS) {
		if (DEBUG_LEVELS.hasOwnProperty(key)) {
			var level = DEBUG_LEVELS[key];
			if (level === DEBUG_LEVEL) {
				debugLevelActive = true;
			}
			/* Set method depending on active level */
			if (debugLevelActive) {
				methods[level] = wrapperDebug(Debug(join(name, level)));
				methods[level].enabled = true;
			} else {
				methods[level] = MOCKED_DEBUG[level];
			}
		}
	}

	var defaultDebugMethod = function defaultDebugMethod() {
		methods[DEBUG_LEVELS.TRACE].apply(this, arguments);
	};

	if (Debug.enabled(methods[DEBUG_LEVEL].namespace) === false) {
		return MOCKED_DEBUG;
	}

	methods.enabled = true;

	return _extends(defaultDebugMethod, methods);
};

DebugModule.reset = function () {
	NAMESPACE = 'smn';
	DEBUG_LEVEL = DEBUG_LEVELS.TRACE;
	Debug.disable();

	return undefined;
};

DebugModule.enabled = Debug.enabled;
DebugModule.enable = Debug.enable;
DebugModule.disable = Debug.disable;
DebugModule.setNS = setNS;
DebugModule.getNS = getNS;
DebugModule.setLevel = setLevel;

exports.DEBUG_LEVELS = DEBUG_LEVELS;
exports.default = DebugModule;