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
 * @api {get} /api/professor/list/v1/:id Get full details of a professor
 * @apiName DetailsProfessorV1
 * @apiGroup Professor
 *
 * @apiSuccess (200) {Object}   professor                     The professor
 * @apiSuccess (200) {Number}   professor.id                  Id
 * @apiSuccess (200) {String}   professor.name                Name
 * @apiSuccess (200) {String}   professor.department          Department Id
 * @apiSuccess (200) {Object[]} professor.courses             Courses taught
 * @apiSuccess (200) {String}   professor.courses.coursecode  3-character course code
 * @apiSuccess (200) {String}   professor.courses.semester    Semester course was taught
 */
router.get("/:id",
  function(req, res) {
    var psName = "api_course_list_v1";  // Prepared Statement Name
    var query =
      "SELECT p.id, p.name, p.deptid AS department, t.crscode AS coursecode, t.sem AS semester " +
      "FROM professor AS p " +
      "LEFT OUTER JOIN teaching AS t " +
      "ON (p.id = t.profid) " +
      "WHERE p.id=$1 " +
      "ORDER BY t.crscode";
    var values = [
      req.params.id // $1
    ];
    dbHelper.query(psName, query, values, function(err, result) {
      if(err) {
        res.status(500).json(err);
        logger.error(err);
      } else if(result.rows.length === 0) {
        res.status(404).json({
          error: "Professor not found."
        });
      } else {
        var professor = {
          id: result.rows[0].id,
          name: result.rows[0].name,
          department: result.rows[0].department,
          courses: []
        };
        if(result.rows[0].coursecode) {
          // Professor has taught at least one course
          // Add the courses to the professor object:
          for(var i = 0; i < result.rows.length; i++) {
            professor.courses.push({
              coursecode: result.rows[i].coursecode,
              semester: result.rows[i].semester
            });
          }
        }
        res.json(professor);
      }
    });
  }
);

////////////
// Export //
////////////

module.exports = router;