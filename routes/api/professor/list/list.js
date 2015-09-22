var express = require("express");

//////////
// Init //
//////////

var router = express.Router();

/////////////////////
// Version Routing //
/////////////////////

var v1 = require("./v1.js");
router.use("/v1", v1);

////////////
// Export //
////////////

module.exports = router;