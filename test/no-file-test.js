var fs = require('fs')
  , path = './DELETEME.txt'
  , stream = fs.createWriteStream(path, { flags: 'w+', encoding: 'utf8' })
  , data = { "I":0.18181818181818182,"bought":0.18181818181818182 }
  ;

function cb(err) {
  if (err) console.log(err);
  console.log('cool, all done.');
}

stream.on('close', cb);
stream.on('error', cb);

var arr = [ JSON.stringify(data)
          , '\n'
          , JSON.stringify(data)
          , '\n'
          ];

// doesn't work:
// (function(arr, fn){
//   for (var i = 0; i < arr.length; i++) {
//     fn(arr[i]);
//   }
// })(arr, stream.write);

// however, this works:

stream.write(JSON.stringify(data));
stream.write('\n');
stream.write(JSON.stringify(data));
stream.write('\n');
stream.write(JSON.stringify(data));

// Wierd eh?


// all writes have been sent
stream.end();
