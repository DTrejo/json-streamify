//
// Pretty much all written by James Halliday (substack.net)
// Small bits by David Trejo (dtrejo.com)
//
var Traverse = require('traverse')
  , fs = require('fs')
  ;

// emit is a function
// also, this is a sync function
exports.streamify = function streamify(obj, emit) {

  Traverse(obj).forEach(function to_s (node) {
    if (Array.isArray(node)) {
      this.before(function () { emit('['); });
      this.post(function (child) {
        if (!child.isLast) emit(',');
      });
      this.after(function () { emit(']'); });

    } else if (typeof node == 'object') {
      this.before(function () { emit('{'); });
      this.pre(function (x, key) {
        to_s(key);
        emit(':');
      });
      this.post(function (child) {
        if (!child.isLast) emit(',');
      });
      this.after(function () { emit('}'); });

    } else if (typeof node == 'string') {
      emit(JSON.stringify(node));

    } else if (typeof node == 'function') {
      emit('null');

    } else {
      emit(node);
    }
  });
};

exports.streamingWrite = function streamingWrite(path, object, cb) {

  var stream = fs.createWriteStream(path, { flags: 'w+', encoding: 'utf8' });

  stream.on('close', cb);
  stream.on('error', cb);

  exports.streamify(object, function(chunk) {
    stream.write(chunk);
  });

  // all writes have been sent, b/c streamify is a sync function.
  stream.end();

};
