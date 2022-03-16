let express = require("express");
const { authJwt } = require("../middleware");

let router = express.Router();

const controller = require("../controllers/manager.controller");


router.get("/", controller.getmanagers);

router.post("/", controller.postmanager);

router.delete("/:id", controller.deletemanager);

router.patch("/:id", controller.userToManager);

module.exports = router;
