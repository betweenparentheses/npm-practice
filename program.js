
var http = require('http');
var map = require('through2-map');
var url = require('url');

// inStream.pipe(map(function (chunk) {
//   return chunk.toString().split('').reverse().join('')
// })).pipe(outStream)


var server = http.createServer(function (request, response) {
  if(request.method !== "GET"){
    return response.end('send me a GET\n');
  }

  var urlObject = url.parse(request.url, true);
  var time = new Date(urlObject.query["iso"]);


  if (urlObject.pathname === '/api/parsetime'){
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end( timeJSON(time) );
  } else if (urlObject.pathname === '/api/unixtime'){
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end( timeUnix(time) );
  } else {
    response.writeHead(404);
    response.end;
  }



  function timeJSON(time){
    return JSON.stringify( { hour : time.getHours(),
                             minute : time.getMinutes(),
                             second : time.getSeconds() });
  }

  function timeUnix(time){
    return JSON.stringify( { unixtime : time.getTime() } );
  }

});
server.listen(process.argv[2]);