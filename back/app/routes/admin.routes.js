let express = require("express");
const { authJwt } = require("../middleware");

let router = express.Router();

const controller = require("../controllers/admin.controller");


router.get("/getManager", controller.getmanagers);

// router.delete("/deleteUser/:id", controller.deleteUser);

router.patch("/userToManager/:id", controller.userToManager);
router.patch("/managerToUser/:id", controller.managerToUser);

router.get("/etablissement", controller.getEtablissements);

router.post("/etablissement", controller.postEtablissement);
// router.post("/etablissement",[authJwt.verifyToken, authJwt.isAdmin], controller.postEtablissement);

router.delete("/etablissement/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.deleteEtablissement);

router.patch("/etablissement/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.updateEtablissement);
// router.patch("/etablissement/manager/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.affectManagerEtablissement);
router.patch("/etablissement/manager/:id", controller.affectManagerEtablissement);

module.exports = router;
