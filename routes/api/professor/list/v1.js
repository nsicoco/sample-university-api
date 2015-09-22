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
 * @api {get} /api/professor/list/v1 List professors
 * @apiName ListProfessorV1
 * @apiGroup Professor
 *
 * @apiSuccess (200) {Object[]} professors        List of professors
 * @apiSuccess (200) {Number}   professors.id     Id of professor
 * @apiSuccess (200) {String}   professors.name   Name of professor
 */
router.get("/",
  function(req, res) {
    var psName = "api_professor_list_v1";  // Prepared Statement Name
    var query =
      "SELECT id, name " +
      "FROM professor " +
      "ORDER BY id";
    var values = [];
    dbHelper.query(psName, query, values, function(err, result) {
      if(err) {
        res.status(500).json(err);
        logger.error(err);
      } else {
        res.json({
          professors: result.rows
        });
      }
    });
  }
);

////////////
// Export //
////////////

module.exports = router;