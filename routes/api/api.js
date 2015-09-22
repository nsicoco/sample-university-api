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

var professor = require("./professor/professor.js");
router.use("/professor", professor);

var student = require("./student/student.js");
router.use("/student", student);

////////////
// Export //
////////////

module.exports = router;