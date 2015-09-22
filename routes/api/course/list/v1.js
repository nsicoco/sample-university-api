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
 * @api {get} /api/course/list/v1 List courses
 * @apiName ListCourseV1
 * @apiGroup Course
 *
 * @apiSuccess (200) {Object[]} courses               List of courses
 * @apiSuccess (200) {String}   courses.coursecode    6-character course code
 * @apiSuccess (200) {String}   courses.name          Name of course
 * @apiSuccess (200) {String}   courses.description   Description of course
 */
router.get("/",
  function(req, res) {
    var psName = "api_course_list_v1";  // Prepared Statement Name
    var query =
      "SELECT crscode AS coursecode, name, descr AS description " +
      "FROM course " +
      "ORDER BY coursecode";
    var values = [];
    dbHelper.query(psName, query, values, function(err, result) {
      if(err) {
        res.status(500).send(JSON.stringify(err));
        logger.error(err);
      } else {
        res.json({
          courses: result.rows
        });
      }
    });
  }
);

////////////
// Export //
////////////

module.exports = router;