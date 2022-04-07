let express = require("express");
const { authJwt } = require("../middleware");

let router = express.Router();

const controller = require("../controllers/user.controller");

router.get("/etablissements", controller.getEtablissements);
router.get("/reservations/:id", controller.getReservationsByUser);

router.post("/reservation", controller.postReservation);

router.delete("/reservation/:id", controller.deleteReservation);

// router.patch("/reservation/:id", controller.patchReservation);

module.exports = router;