# JSON Streamify

[![Build Status](https://travis-ci.org/DTrejo/json-streamify.png)](http://travis-ci.org/DTrejo/json-streamify)

A streaming version of `JSON.stringify`.

    npm install json-streamify

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
