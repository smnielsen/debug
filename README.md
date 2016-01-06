## Debug wrapper

This is a fork of the popular [npm debug](https://www.npmjs.com/package/debug) package.

Credits and thanks goes to the creator.

[![Coverage Status](https://coveralls.io/repos/smnielsen/debugwrapper/badge.svg?branch=master&service=github)](https://coveralls.io/github/smnielsen/debugwrapper?branch=master)

### Installation

Use with npm:

```javascript
{
...
	"debugwrapper": "ssh+git@github.com:smnielsen/debugwrapper.git#[VERSION]"
...
}
```

### Use as below

```javascript
import Debug from 'debugwrapper';
Debug.setNS('namespace')
Debug.enable('namespace:*')

let debug = Debug('application');
debug('Logging something...')
````

### Set debug level

```javascript
import Debug from 'debugwrapper';
import {DEBUG_LEVELS} from 'debugwrapper';

Debug.setLevel(DEBUG_LEVELS.INFO);

var debug = Debug('test');

debug.trace('Something...'); <-- Will not be evaluated
debug.info('Something that will be printed..');
```

#### Available levels

```javascript
const DEBUG_LEVELS = {
	TRACE: 'trace',
	DEBUG: 'debug',
	INFO: 'info',
	WARN: 'warn',
	ERROR: 'error',
	DANGER: 'danger'
};
```