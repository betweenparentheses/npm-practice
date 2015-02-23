var fs = require('fs');
var path = require('path');

module.exports = function (dir, ext, callback){
                    fs.readdir(dir, function (err, files) {
                      if (err) return callback(err);
                      // ... no error, continue doing cool things with `data`
                      

                      filtered = files.filter(function(file){
                        return ( path.extname(file) === "." + ext )
                      })

                                            // all went well, call callback with `null` for the error argument
                  
                      callback(null, filtered);
                    });
                  };

