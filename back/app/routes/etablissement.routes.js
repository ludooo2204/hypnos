let express = require("express");
const { authJwt } = require("../middleware");

let router = express.Router();

const controller = require("../controllers/etablissement.controller");


router.get("/", controller.getEtablissements);

router.post("/",[authJwt.verifyToken, authJwt.isAdmin], controller.postEtablissement);

router.delete("/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.deleteEtablissement);

router.patch("/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.patchEtablissement);

module.exports = router;
