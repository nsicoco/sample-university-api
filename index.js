var express = require("express");
var helmet = require("helmet");
var logger = require("winston");
var path = require("path");

//////////
// Init //
//////////

var app = express();
var BASE_PATH = "/";
var ROUTES_FOLDER = path.join(__dirname, "routes");

// Configure Winston Logger:
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true,
  debugStdout: true,
  handleExceptions: true,
  level: "debug",
  prettyPrint: true,
  timestamp: true
});

////////////////
// Middleware //
////////////////

app.use(helmet());

/////////////
// Routing //
/////////////

var api = require(path.join(ROUTES_FOLDER, "api", "api.js"));
app.use(path.join(BASE_PATH, "api"), api);

/////////////
// Startup //
/////////////

var port = (process.env.PORT || 5000);
var server = app.listen(port, function() {
  logger.info(" * Listening on port " + port);
  logger.debug(" * Press Ctrl+C to exit");
});