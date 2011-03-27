# JSON Streamify

A streaming version of `JSON.stringify`.

    npm install

## Methods

### `streamify(object, function)`

Passes the function chunks of the object until there is none of the object left.
`streamify` is a synchronous function.

    var assert = require('assert')
      , streamify = require('../streamify').streamify
      , streamingWrite = require('../streamify').streamingWrite
      , fs = require('fs')
      , object = { a: 1, b: 2, c: 3}

    var str = '';
    streamify(object, function(data) { str += data; });
    console.log(str);
    // => {"a":1,"b":2,"c":3}

### `streamingWrite(filepath, object, callback)`

Writes chunks of the object to the given filepath until there is none of the object left.
When it finishes, it calls `callback`.

    var str = '';
    streamingWrite('./ACOOLFILE.txt', object, function(data) { str += data; }, function() {

      console.log(fs.readFileSync('./ACOOLFILE'));
      // => {"a":1,"b":2,"c":3}
    });

Most of this was written by [James Halliday](http://substack.net), with a few small things by [David Trejo](http://dtrejo.com/).

### TODOs

- allow a stream to be passed into `streamify(object, stream)`?
- escapes strings correctly
- package.json has deps
- throw binary data at it and make sure JSON.parse() doesn't error when you read it back
  try using this string:

        var s = ''; for (var i = 0; i < 255; i++) { s += String.fromCharCode(i) }

  and maybe this to fix it, along with something else.

        .replace(/\\/gi, '\\\\')
- fix the tests which fail on the above few todos
