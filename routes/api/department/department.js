var express = require("express");
var path = require("path");

//////////
// Init //
//////////

var router = express.Router();

/////////////
// Routing //
/////////////

var list = require(path.join(__dirname, "list", "list.js"));
router.use("/list", list);

////////////
// Export //
////////////

module.exports = router;