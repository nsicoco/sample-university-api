var express = require("express");
var path = require("path");

//////////
// Init //
//////////

var router = express.Router();

/////////////
// Routing //
/////////////

var department = require(path.join(__dirname, "department", "department.js"));
router.use("/department", department);

////////////
// Export //
////////////

module.exports = router;