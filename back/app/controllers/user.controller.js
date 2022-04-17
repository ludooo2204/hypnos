const db = require("../models");

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
			res.status(200).json({ etablissement });
		});
};
exports.getReservationsByUser = (req, res) => {
	db.reservation
		.findAll({
			model: db.reservation,
			attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
			where: { userId: req.params.id },
			include: [
				{
					model: db.suite,
					attributes: { exclude: ["createdAt", "updatedAt"] },
					include: [],
				},
			],
		})
		.then((reservations) => {
			res.status(200).json({ reservations });
		});
};

exports.postReservation = (req, res) => {
	const { userId, suiteId } = req.body;
	const dateDebut = new Date(req.body.dateDebut);
	const dateFin = new Date(req.body.dateFin);
	db.reservation.findAll({ where: { suiteId } }).then((resa) => {
		for (const reservation of resa) {
			if ((dateDebut.getTime() >= reservation.dateDebut.getTime() && dateDebut.getTime() <= reservation.dateFin.getTime()) || (dateFin.getTime() >= reservation.dateDebut.getTime() && dateFin.getTime() <= reservation.dateFin.getTime())) {
				console.log("deja reservé !!!");
				res.status(200).json({ validation: "déja réservé" });
			}
		}
		db.reservation.create({ dateDebut, dateFin, userId, suiteId }).then((e) => {
			res.status(200).json({ validation: "ok", dateDebut, dateFin });
		});
	});
};

exports.deleteReservation = (req, res) => {
	db.reservation
		.destroy({
			where: { id: req.params.id },
		})
		.then((resa) => {
			console.log("resa supprimé !!");
			res.status(200).json({ message: resa });
		});
};
