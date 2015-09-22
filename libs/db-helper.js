var async = require("async");
var pg = require("pg");

//////////////////////
// Helper Functions //
//////////////////////

function rollback(client, done, callback) {
  client.query("ROLLBACK", function(err) {
    done(); // Close client
    callback();
  });
}

function commit(client, done, callback) {
  client.query("COMMIT", function(err) {
    if(err) {
      // Rollback if unable to commit
      rollback(client, done, function() {
        callback(err);
      });
    } else {
      done(); // Close client on success
      callback();
    }
  });
}

function makeQuery(name, text, values, client, callback) {
  var query;
  if(name) {
    // If name is specified, use a prepared statement
    query = client.query({
      name: name,
      text: text,
      values: values
    });
  } else {
    // Else, use a parameterized query
    query = client.query(text, values);
  }
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    callback(null, result);
  });
  query.on("error", function(err) {
    callback(err);
  });
}

///////////////////////////////////
// Exported Function Definitions //
///////////////////////////////////

function connect(callback) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    callback(err, client, done);
  });
}

function query(name, text, values, callback) {
  async.waterfall([
    connect,
    function(client, done, callback) {
      makeQuery(name, text, values, client, function(err, result) {
        done();
        callback(err, result);
      });
    }
  ], function then(err, result) {
    callback(err, result);
  });
}

function transact(name, text, values, callback) {
  async.waterfall([
    connect,
    function beginTransaction(client, done, callback) {
      client.query("BEGIN", function(err) {
        if(err) {
          rollback(client, done, function() {
            callback(err);
          });
        } else {
          callback(null, client, done);
        }
      });
    },
    function(client, done, callback) {
      makeQuery(name, text, values, client, function(err, result) {
        if(err) {
          rollback(client, done, function() {
            callback(err);
          });
        } else {
          commit(client, done, function(err) {
            callback(err, result);
          });
        }
      });
    }
  ], function then(err, result) {
    callback(err, result);
  });
}

////////////
// Export //
////////////

module.exports = {
  connect: connect,
  query: query,
  transact: transact
};