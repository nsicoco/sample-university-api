var express = require("express");
var path = require("path");

//////////
// Init //
//////////

var router = express.Router();

/////////////
// Routing //
/////////////

router.get("/", function(req, res) {
  res.send("test string");
});

////////////
// Export //
////////////

module.exports = router;