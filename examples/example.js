var assert = require('assert')
  , streamify = require('../streamify').streamify
  , streamingWrite = require('../streamify').streamingWrite
  , fs = require('fs')
  , object = { a: 1, b: 2, c: 3}

var str = '';
streamify(object, function(data) { str += data; });
console.log(str);
// => {"a":1,"b":2,"c":3}

var str = '';
streamingWrite('./ACOOLFILE.txt', object, function(data) { str += data; });
console.log(fs.readFileSync('./ACOOLFILE'));
// => {"a":1,"b":2,"c":3}
