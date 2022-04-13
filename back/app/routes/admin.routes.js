let express = require("express");
const { authJwt } = require("../middleware");


let router = express.Router();

const controller = require("../controllers/admin.controller");


router.get("/getUsers", controller.getUsers);
router.get("/etablissement", controller.getEtablissements);

// router.delete("/deleteUser/:id", controller.deleteUser);

router.get("/userToManager/:id",[authJwt.isAdmin], controller.userToManager);
router.get("/managerToUser/:id",[authJwt.isAdmin], controller.managerToUser);


router.post("/etablissement",[authJwt.isAdmin], controller.postEtablissement);
// router.post("/etablissement",[authJwt.verifyToken, authJwt.isAdmin], controller.postEtablissement);

router.delete("/etablissement/:id",[authJwt.isAdmin], controller.deleteEtablissement);
// router.delete("/etablissement/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.deleteEtablissement);

router.patch("/etablissement/:id",[authJwt.isAdmin], controller.updateEtablissement);
// router.patch("/etablissement/manager/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.affectManagerEtablissement);
router.patch("/etablissement/manager/:id",[authJwt.isAdmin], controller.affectManagerEtablissement);



router.post("/etablissement/postImage", controller.postEtablissementImage);


module.exports = router;
