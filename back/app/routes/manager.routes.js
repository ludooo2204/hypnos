let express = require("express");
const { authJwt } = require("../middleware");

let router = express.Router();

const controller = require("../controllers/manager.controller");

router.get("/suite", controller.getSuites);

router.post("/suite", controller.postSuite);
router.post("/postImage", controller.postImage);

router.delete("/suite/:id", controller.deleteSuite);

router.patch("/suite/:id", controller.updateSuite);

module.exports = router;
