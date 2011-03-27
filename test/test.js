var assert = require('assert')
  , streamify = require('../streamify').streamify
  , streamingWrite = require('../streamify').streamingWrite
  , testCase = require('nodeunit').testCase
  , fs = require('fs')
  , small = { a: 1, b: 2, c: 3}
  , medium = {"J":{"I":0.18181818181818182,"bought":0.18181818181818182,"some":0.18181818181818182,"bread":0.09090909090909091,"butter":0.09090909090909091},"'ai":{"I":0.18181818181818182,"bought":0.18181818181818182,"some":0.18181818181818182,"bread":0.09090909090909091,"butter":0.09090909090909091},"acheter":{"I":0.18181818181818182,"bought":0.18181818181818182,"some":0.18181818181818182,"bread":0.09090909090909091,"butter":0.09090909090909091},"du":{"I":0.18181818181818182,"bought":0.18181818181818182,"some":0.18181818181818182,"bread":0.09090909090909091,"butter":0.09090909090909091},"pain":{"I":0.09999999999999999,"bought":0.09999999999999999,"some":0.09999999999999999,"bread":0.18333333333333332,"We":0.08333333333333333,"must":0.08333333333333333,"eat":0.08333333333333333,"the":0.08333333333333333,"white":0.08333333333333333},"beurre":{"I":0.25,"bought":0.25,"some":0.25,"butter":0.25},"Nous":{"We":0.16666666666666669,"must":0.16666666666666669,"eat":0.16666666666666669,"the":0.16666666666666669,"white":0.16666666666666669,"bread":0.16666666666666669},"devon":{"We":0.16666666666666669,"must":0.16666666666666669,"eat":0.16666666666666669,"the":0.16666666666666669,"white":0.16666666666666669,"bread":0.16666666666666669},"manger":{"We":0.16666666666666669,"must":0.16666666666666669,"eat":0.16666666666666669,"the":0.16666666666666669,"white":0.16666666666666669,"bread":0.16666666666666669},"le":{"We":0.16666666666666669,"must":0.16666666666666669,"eat":0.16666666666666669,"the":0.16666666666666669,"white":0.16666666666666669,"bread":0.16666666666666669},"blanc":{"We":0.16666666666666669,"must":0.16666666666666669,"eat":0.16666666666666669,"the":0.16666666666666669,"white":0.16666666666666669,"bread":0.16666666666666669}}
  , size = 100
  , big = []
  ;
  
while(size--) {
  big.push(medium);
}

module.exports = testCase({
  test_small_object: function(assert) {
    var str = '';
    streamify(small, function(data) { str += data; });
  
    assert.equals(JSON.stringify(small), str
      , 'JSON.stringify and streamify return the same string for a small object');
    assert.done();
  }
  , test_big_object: function(assert) {  
    var str = '';
    streamify(big, function(data) { str += data; });
  
    assert.equals(JSON.stringify(big), str
      , 'JSON.stringify and streamify return the same string for a big object');
    assert.done();
  }
  , test_small_streaming_write: function(assert) {
    path = './DELETEME.txt';
    streamingWrite(path, small, function() {
      assert.equals(JSON.stringify(small), fs.readFileSync(path).toString('utf8')
        , 'Streaming write to file with small object returns same as JSON.stringify');
      fs.unlinkSync(path);
      assert.done();
    });
  }
  , test_big_streaming_write: function(assert) {
    path = './DELETEME.txt';
    streamingWrite(path, big, function() {
      assert.equals(JSON.stringify(big), fs.readFileSync(path).toString('utf8')
        , 'Streaming write to file with big object returns same as JSON.stringify');
      fs.unlinkSync(path);
      assert.done();      
    });
  }
});