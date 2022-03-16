let express = require("express");
let router = express.Router();

const controller = require("../controllers/creation.controller");


router.get("/", controller.getCreations);

router.post("/", controller.postCreation);

router.delete("/:id", controller.deleteCreation);

router.patch("/:id", controller.patchCreation);

module.exports = router;
