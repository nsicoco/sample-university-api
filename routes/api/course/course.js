var express = require("express");

//////////
// Init //
//////////

var router = express.Router();

/////////////
// Routing //
/////////////

var details = require("./details/details.js");
router.use("/details", details);

var list = require("./list/list.js");
router.use("/list", list);

////////////
// Export //
////////////

module.exports = router;