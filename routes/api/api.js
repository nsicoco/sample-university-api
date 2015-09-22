var express = require("express");

//////////
// Init //
//////////

var router = express.Router();

/////////////
// Routing //
/////////////

var course = require("./course/course.js");
router.use("/course", course);

var department = require("./department/department.js");
router.use("/department", department);

////////////
// Export //
////////////

module.exports = router;