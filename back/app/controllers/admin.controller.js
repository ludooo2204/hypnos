const db = require("../models");

const user = db.user;
const role = db.role;
const suite = db.suite;
const etablissement = db.etablissement;
const user_roles = db.sequelize.models.user_roles;

exports.getUsers = (req, res) => {
	user.findAll({
		model: user,
		attributes: { exclude: ["createdAt", "updatedAt", "password"] },
		include: [{ model: role, attributes: { exclude: ["createdAt", "updatedAt"] } }],
	}).then((users) => {
		res.status(200).json({ users });
	});
};
exports.getEtablissements = (req, res) => {
	etablissement
		.findAll({
			model: etablissement,
			attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
			include: [
				{ model: user, attributes: { exclude: ["createdAt", "updatedAt"] } },
				{ model: suite, attributes: { exclude: ["createdAt", "updatedAt"] }, include: [{ model: db.image, attributes: { exclude: ["createdAt", "updatedAt"] } }] },
			],
		})
		.then((etablissement) => {
			res.status(200).json({ etablissement });
		});
};

exports.postEtablissement = (req, res) => {
	const { nom, description, adresse, ville, manager } = req.body;
	console.log(req.body);
	let data = req.body;

	etablissement
		.create({ nom, description, adresse, ville, userId: manager, image: data.images })
		.then((etablissement) => {
			console.log("etablissement crée!");
			res.status(200).json({ etablissement });
		})
		.catch((err) => console.log("loupé", err));
};
exports.deleteEtablissement = (req, res) => {
	etablissement.destroy({ where: { id: req.params.id } }).then((etablissement) => {
		console.log("etablissement supprimé!");
		res.status(200).json({ etablissement });
	});
};
exports.updateEtablissement = (req, res) => {
	console.log("update etablissement");
	const { nom, description, adresse, ville, image } = req.body;
	etablissement.update({ nom, description, adresse, ville, image }, { where: { id: req.params.id } }).then((etablissement) => {
		console.log("etablissement modifié!");
		res.status(200).json({ etablissement });
	});
};
exports.affectManagerEtablissement = (req, res) => {
	console.log("affectManagerEtablissement");
	const { userId } = req.body;
	etablissement.update({ userId }, { where: { id: req.params.id } }).then((etablissement) => {
		console.log(userId + " manager affecté à l'établissement " + req.params.id);
		res.status(200).json({ message: etablissement });
	});
};
exports.userToManager = (req, res) => {
	console.log("userToManager");
	console.log(req.params.id);
	role.findAll().then((roles) => {
		const manager = [...roles];

		manager.pop();
		//MAJ du user en manager
		user_roles.findAll({ where: { userId: req.params.id, roleId: 2 } }).then((e) => {
			console.log("eeee", e);
			if (!e[0]) {
				user_roles.create({ userId: req.params.id, roleId: 2 }).then((e) => {
					console.log("transformation en manager!!");
					res.status(200).json({ message: e });
				});
			} else res.status(200).json({ message: null });
		});
	});
};
exports.managerToUser = (req, res) => {
	console.log("managerToUser");

	user_roles.destroy({ where: { userId: req.params.id } }).then((e) => {
		user_roles.create({ userId: req.params.id, roleId: 1 });
		console.log("transformation en user!!");
		res.status(200).json({ message: e });
	});
};

exports.postEtablissementImage = (req, res) => {
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
