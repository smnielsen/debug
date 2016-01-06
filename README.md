## Debug wrapper

For more info about 'debug' package go to [npm debug](https://www.npmjs.com/package/debug)

[![Coverage Status](https://coveralls.io/repos/smnielsen/smn-debug/badge.svg?branch=master&service=github)](https://coveralls.io/github/smnielsen/smn-debug?branch=master)


### Installation

Use with npm:

```javascript
{
...
	"smn-debug": "ssh+git@github.com:smnielsen/smn-debug.git#[VERSION]"
...
}
```

### Use as below

```javascript
import Debug from 'smn-debug';
Debug.setNS('namespace')
Debug.enable('namespace:*')

let debug = Debug('application');
debug('Logging something...')
````

### Set debug level

```javascript
import Debug from 'smn-debug';
import {DEBUG_LEVELS} from 'smn-debug';

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