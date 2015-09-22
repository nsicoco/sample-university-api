var express = require("express");

//////////
// Init //
//////////

var router = express.Router();

/////////////
// Routing //
/////////////

var list = require("./list/list.js");
router.use("/list", list);

////////////
// Export //
////////////

module.exports = router;