const db = require("../models");
const suite = db.suite;
const image = db.image;
const images = db.sequelize.models.image;

console.log("images");
console.log(images);
console.log("image");
console.log(image);
console.log("suite");
console.log(suite);

exports.getSuites = (req, res) => {
	suite
		.findAll({
			model: suite,
			attributes: { exclude: ["createdAt", "updatedAt"] },
			include: [
				{ model: images, attributes: { exclude: ["createdAt", "updatedAt"] } },
				{ model: db.reservation, attributes: { exclude: ["createdAt", "updatedAt"] } },
			],
		})
		.then((suite) => {
			console.log(JSON.stringify(suite, null, 2));
			res.status(200).json({ message: suite });
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
			res.status(200).json({ message: suite });
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
			res.status(200).json({ message: suite });
		});
};
exports.updateSuite = (req, res) => {
	const { nom, imageMiseEnAvant, prix, description, UrlBooking, images } = req.body;

	suite
		.update(
			{ nom, imageMiseEnAvant, prix, description, UrlBooking, images },

			{
				where: { id: req.params.id },
			},
			{
				include: [image],
			}
		)
		.then((suite) => {
			console.log("suite modifiée !!");
			console.log(JSON.stringify(suite, null, 2));
			res.status(200).json({ message: suite });
		});
};
