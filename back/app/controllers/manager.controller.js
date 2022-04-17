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
	console.log("postsuite!");
	const { nom, imageMiseEnAvant, prix, description, lien, images, etablissementId } = req.body;
	suite
		.create({ nom, imageMiseEnAvant, prix, description, UrlBooking: lien, etablissementId })
		.then((suite) => {
			for (const iterator of req.body.images) {
				image
					.create({ nom: iterator, suiteId: suite.id })
					.then(() => {
						console.log("images recrée");
					})
					.catch((err) => console.log("erreur", err));
			}
		})
		.then((suite) => {
			console.log("suite créé !!");
			res.status(200).json({ status: "ok" });
		})
		.catch((error) => console.log("err", error));
};

exports.updateSuite = (req, res) => {
	const { nom, imageMiseEnAvant, prix, description, UrlBooking } = req.body;

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
						image.destroy({ where: { id: iterator.id } }).then(() => {
							console.log("images supprimée");
						});
					}
				})
				.then(() => {
					for (const iterator of req.body.images) {
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

exports.deleteSuite = (req, res) => {
	suite
		.destroy({
			where: { id: req.params.id },
		})
		.then((suite) => {
			console.log("suite créé !!");
			res.status(200).json({ suite });
		});
};

exports.postImage = (req, res) => {
	console.log("post images");
	console.log("req");
	// console.log(req.files);
	if (!req.files) {
		res.send({
			status: false,
			message: "No file uploaded",
		});
	} else {
		//Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
		let avatar = req.files.file;
		//Use the mv() method to place the file in upload directory (i.e. "uploads")
		avatar.mv("../client/public/uploads/" + avatar.name, function (err) {
			if (err) return res.status(500).send(err);

			res.send({
				status: true,
				message: "File is uploaded",
				data: {
					name: avatar.name,
					// name: rnd+avatar.name,
					mimetype: avatar.mimetype,
					size: avatar.size,
				},
			});
		});
	}
};
