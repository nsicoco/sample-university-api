var express = require("express");
var logger = require("winston");
var path = require("path");

var dbHelper = require(path.join(global.LIBS_FOLDER, "db-helper.js"));

//////////
// Init //
//////////

var router = express.Router();

/////////////////////////
// Api Call Definition //
/////////////////////////

/**
 * @api {get} /api/student/list/v1 List students
 * @apiName ListStudentV1
 * @apiGroup Student
 *
 * @apiSuccess (200) {Object[]} student        List of students
 * @apiSuccess (200) {Number}   student.id     Id of student
 * @apiSuccess (200) {String}   student.name   Name of student
 */
router.get("/",
  function(req, res) {
    var psName = "api_student_list_v1";  // Prepared Statement Name
    var query =
      "SELECT id, name " +
      "FROM student " +
      "ORDER BY id";
    var values = [];
    dbHelper.query(psName, query, values, function(err, result) {
      if(err) {
        res.status(500).json(err);
        logger.error(err);
      } else {
        res.json({
          students: result.rows
        });
      }
    });
  }
);

////////////
// Export //
////////////

module.exports = router;