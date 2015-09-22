var express = require("express");

//////////
// Init //
//////////

var router = express.Router();

/////////////
// Routing //
/////////////

var department = require("./department/department.js");
router.use("/department", department);

////////////
// Export //
////////////

module.exports = router;