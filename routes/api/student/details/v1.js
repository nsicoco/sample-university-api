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
 * @api {get} /api/student/details/v1/:id Get full details of a student
 * @apiName DetailsStudentV1
 * @apiGroup Student
 *
 * @apiSuccess (200) {Object}   student                       The student
 * @apiSuccess (200) {Number}   student.id                    Id
 * @apiSuccess (200) {String}   student.name                  Name
 * @apiSuccess (200) {String}   student.address               Address
 * @apiSuccess (200) {String}   student.status                Status (e.g., Freshman)
 * @apiSuccess (200) {Object[]} student.transcript            Courses taken
 * @apiSuccess (200) {String}   student.transcript.coursecode 3-character course code
 * @apiSuccess (200) {String}   student.transcript.semester   Semester course was taken
 * @apiSuccess (200) {String}   student.transcript.grade      Course grade
 */
router.get("/:id",
  function(req, res) {
    var psName = "api_student_details_v1";  // Prepared Statement Name
    var query =
      "SELECT s.id, s.name, s.address, s.status, t.crscode AS coursecode, t.sem AS semester, t.grade " +
      "FROM student AS s " +
      "LEFT OUTER JOIN transcript AS t " +
      "ON (s.id = t.studid) " +
      "WHERE s.id=$1";
    var values = [
      req.params.id // $1
    ];
    dbHelper.query(psName, query, values, function(err, result) {
      if(err) {
        res.status(500).json(err);
        logger.error(err);
      } else if(result.rows.length === 0) {
        res.status(404).json({
          error: "Student not found."
        });
      } else {
        var student = {
          id: result.rows[0].id,
          name: result.rows[0].name,
          address: result.rows[0].address,
          status: result.rows[0].status,
          transcript: []
        };
        if(result.rows[0].coursecode) {
          // Student has taken at least one course
          // Add the courses to the student object:
          for(var i = 0; i < result.rows.length; i++) {
            var course = {
              coursecode: result.rows[i].coursecode,
              semester: result.rows[i].semester
            };
            if(result.rows[i].grade) {
              course.grade = result.rows[i].grade;
            } else {
              // If there is no grade, use 'TBD' as the grade
              course.grade = "TBD";
            }
            student.transcript.push(course);
          }
        }
        res.json(student);
      }
    });
  }
);

////////////
// Export //
////////////

module.exports = router;