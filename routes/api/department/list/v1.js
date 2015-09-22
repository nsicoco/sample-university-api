var express = require("express");
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
 * @api {post} /api/department/list/v1 List departments
 * @apiName ListDepartmentV1
 * @apiGroup Department
 *
 * @apiSuccess (200) {Object[]} departments       List of departments
 * @apiSuccess (200) {String}   departments.id    3-character department id
 * @apiSuccess (200) {String}   departments.name  Name of department
 */
router.get("/",
  function(req, res) {
    var psName = "api_department_list_v1";  // Prepared Statement Name
    var query = "SELECT * FROM department";
    var values = [];
    dbHelper.query(psName, query, values, function(err, result) {
      if(err) {
        res.status(500).send(JSON.stringify(err));
      } else {
        res.send({
          departments: result
        });
      }
    });
  }
);

////////////
// Export //
////////////

module.exports = router;