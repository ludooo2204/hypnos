const db = require("../models");

// router.patch("/reservation/:id", controller.patchReservation);
// router.get("/etablissements", controller.getEtablissements);
exports.getEtablissements = (req, res) => {
	db.etablissement
		.findAll({
			model: db.etablissement,
			attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
			include: [
				{ model: db.user, attributes: { exclude: ["createdAt", "updatedAt", "password"] } },
				{
					model: db.suite,
					attributes: { exclude: ["createdAt", "updatedAt"] },
					include: [
						{ model: db.reservation, attributes: { exclude: ["createdAt", "updatedAt"] } },
						{ model: db.image, attributes: { exclude: ["createdAt", "updatedAt"] } },
					],
				},
			],
		})
		.then((etablissement) => {
			console.log(JSON.stringify(etablissement, null, 2));
			res.status(200).json({ etablissement });
		});
};

// router.post("/reservation", controller.postReservation);
exports.postReservation = (req, res) => {
	//TODO revoir l'algo de filtre des date
	// si je cherche du 1 avril 2022 au 5 avril 2022, supprimer du tri tous les fin de resa <1 avril et toutes les debut>5 avril
	const { userId, suiteId } = req.body;
	 console.log(req.body)
	const dateDebut = new Date(req.body.dateDebut);
	const dateFin = new Date(req.body.dateFin);
	console.log(req.body.dateFin);
	console.log(dateFin);
	db.reservation.findAll({ where: { suiteId } }).then((resa) => {
		console.log(JSON.stringify(resa, null, 2));
		for (const reservation of resa) {
			if ((dateDebut.getTime() >= reservation.dateDebut.getTime() && dateDebut.getTime() <= reservation.dateFin.getTime()) || (dateFin.getTime() >= reservation.dateDebut.getTime() && dateFin.getTime() <= reservation.dateFin.getTime())) {
				console.log("deja reservé !!!");
				res.status(200).json({ validation: "déja réservé" });
			}
		}
			db.reservation.create({ dateDebut, dateFin, userId, suiteId }).then((e) => {
				console.log("reservation créé !!");
				console.log(JSON.stringify(e, null, 2));
				res.status(200).json({ validation: "ok" });
			});
	});
};
// router.delete("/reservation/:id", controller.deleteReservation);

exports.deleteReservation = (req, res) => {
	//TODO controler la date . possible sil reste au moins 3 jours
	db.reservation
		.destroy({
			where: { id: req.params.id },
		})
		.then((resa) => {
			console.log("resa supprimé !!");
			console.log(JSON.stringify(resa, null, 2));
			res.status(200).json({ message: resa });
		});
};
// exports.updateSuite = (req, res) => {
// 	const { nom, imageMiseEnAvant,prix, description, UrlBooking,images } = req.body;

// 	suite
// 		.update(
// 			{ nom, imageMiseEnAvant,prix, description, UrlBooking,images },

// 			{
// 				where: {id:req.params.id}
// 			},
// 			{
// 				include: [image]
// 			  }
// 		)
// 		.then((suite) => {
// 			console.log("suite modifiée !!")
// 			console.log(JSON.stringify(suite, null, 2));
// 			res.status(200).json({ message: suite });
// 		});
// };
