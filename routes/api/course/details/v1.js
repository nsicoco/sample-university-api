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
 * @api {get} /api/course/list/v1/:coursecode Get full details of a course
 * @apiName DetailsCourseV1
 * @apiGroup Course
 *
 * @apiSuccess (200) {Object} course              List of courses
 * @apiSuccess (200) {String} course.coursecode   6-character course code
 * @apiSuccess (200) {String} course.name         Name of course
 * @apiSuccess (200) {String} course.description  Description of course
 */
router.get("/:coursecode",
  function(req, res) {
    var psName = "api_course_list_v1";  // Prepared Statement Name
    var query =
      "SELECT crscode AS coursecode, name, descr AS description " +
      "FROM course " +
      "WHERE crscode=$1 " +
      "LIMIT 1";
    var values = [
      req.params.coursecode.toUpperCase() // $1
    ];
    dbHelper.query(psName, query, values, function(err, result) {
      if(err) {
        res.status(500).json(err);
        logger.error(err);
      } else {
        if(result.rows.length === 0) {
          res.status(404).json({
            error: "Course not found."
          });
        } else {
          res.json(result.rows[0]);
        }
      }
    });
  }
);

////////////
// Export //
////////////

module.exports = router;