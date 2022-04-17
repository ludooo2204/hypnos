let express = require("express");

let router = express.Router();

const controller = require("../controllers/user.controller");

router.get("/etablissements", controller.getEtablissements);
router.get("/reservations/:id", controller.getReservationsByUser);

router.post("/reservation", controller.postReservation);

router.delete("/reservation/:id", controller.deleteReservation);

module.exports = router;
