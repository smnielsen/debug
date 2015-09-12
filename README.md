## Debug wrapper

For more info about 'debug' package go to [npm debug](https://www.npmjs.com/package/debug)

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