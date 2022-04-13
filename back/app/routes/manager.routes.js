let express = require("express");
const { authJwt } = require("../middleware");

let router = express.Router();

const controller = require("../controllers/manager.controller");

// router.get("/suite", controller.getSuites);

router.post("/suite", [authJwt.isManager], controller.postSuite);

router.delete("/suite/:id", [authJwt.isManager], controller.deleteSuite);

router.patch("/suite/:id", [authJwt.isManager], controller.updateSuite);
router.post("/postImage", controller.postImage);

module.exports = router;
