var async = require("async");
var pg = require("pg");

//////////////////////////
// Function Definitions //
//////////////////////////

function connect(callback) {
  async.waterfall([
    function startConnection(callback) {
      pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        callback(err, client, done);
      });
    }
  ], function then(err) {

  });
}

////////////
// Export //
////////////