const db = require("../models");
const suite = db.suite;
const image = db.image;
const images = db.sequelize.models.image;

exports.getSuites = (req, res) => {
	suite
		.findAll({
			model: suite,
			attributes: { exclude: ["createdAt", "updatedAt"] },
			include: [
				{ model: images, attributes: { exclude: ["createdAt", "updatedAt"] } },
				{ model: db.reservation, attributes: { exclude: ["createdAt", "updatedAt"] } },
				{ model: db.reservation, attributes: { exclude: ["createdAt", "updatedAt"] } },
			],
		})
		.then((suite) => {
			console.log(JSON.stringify(suite, null, 2));
			res.status(200).json({ suite });
		});
};

exports.postSuite = (req, res) => {
	const { nom, imageMiseEnAvant, prix, description, UrlBooking, images, etablissementId } = req.body;
	suite
		.create(
			{ nom, imageMiseEnAvant, prix, description, UrlBooking, images, etablissementId },
			{
				include: [image],
			}
		)
		.then((suite) => {
			console.log("suite créé !!");
			console.log(JSON.stringify(suite, null, 2));
			res.status(200).json({ suite });
		});
};
exports.deleteSuite = (req, res) => {
	suite
		.destroy({
			where: { id: req.params.id },
		})
		.then((suite) => {
			console.log("suite créé !!");
			console.log(JSON.stringify(suite, null, 2));
			res.status(200).json({ suite });
		});
};
exports.updateSuite = (req, res) => {
	const { nom, imageMiseEnAvant, prix, description, UrlBooking } = req.body;
	// const { nom, imageMiseEnAvant, prix, description, UrlBooking, images } = req.body;
	console.log(req.body.imageMiseEnAvant);
	console.log("req.params.id");
	console.log(req.params.id);
	console.log("req.body.images");
	console.log(req.body.images);
	suite
		.update(
			{ nom, imageMiseEnAvant, prix, description, UrlBooking },

			{
				where: { id: req.params.id },
			}
		)
		.then(() => {
			image
				.findAll({ where: { suiteId: req.params.id } })
				.then((e) => {
					console.log("e", JSON.stringify(e, null, 2));
					for (const iterator of e) {
						// console.log("iterator");
						// console.log(iterator);
						image.destroy({ where: { id: iterator.id } }).then(() => {
							console.log("images supprimée");
						});
					}
				})
				.then(() => {
					for (const iterator of req.body.images) {
						console.log("iterator");
						console.log(iterator);
						image
							.create({ nom: iterator, suiteId: req.params.id })
							.then(() => {
								console.log("images recrée");
							})
							.catch((err) => console.log("erreur", err));
					}
				});
		})
		.then((suite) => {
			console.log("suite modifiée !!");
			res.status(200).json({ status: "ok" });
		});
};
