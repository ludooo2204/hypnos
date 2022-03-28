const db = require("../models");
const fs = require("fs");

const user = db.user;
const role = db.role;
const suite = db.suite;
const etablissement = db.etablissement;
const user_roles = db.sequelize.models.user_roles;

exports.getUsers = (req, res) => {
	console.log("coucou from get");
	user.findAll({
		model: user,
		attributes: { exclude: ["createdAt", "updatedAt", "password"] },
		include: [{ model: role, attributes: { exclude: ["createdAt", "updatedAt"] } }],
	}).then((users) => {
		console.log(JSON.stringify(users, null, 2));
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
				{ model: suite, attributes: { exclude: ["createdAt", "updatedAt"] },
				 include: [{ model: db.image, attributes: { exclude: ["createdAt", "updatedAt"] } }] },
			],
		})
		.then((etablissement) => {
			console.log(JSON.stringify(etablissement, null, 2));
			res.status(200).json({ etablissement });
		});
};

exports.postEtablissement = (req, res) => {
	const { nom, description, adresse, ville,manager } = req.body;
	// etablissement.create({ nom, description, adresse, ville }).then((etablissement) => {
	// 	console.log("etablissement crée!");
	// 	console.log(JSON.stringify(etablissement, null, 2));
	// 	res.status(200).json({ message: etablissement });
	// });

	console.log(req.body);
	//pour chaque image uploadé, on crée une copie minifiée en taille puis on renomme les 2 avec une rnd pour eviter les noms de fichiers en doublons
	let data = req.body;
	const rnd = +new Date();
	let dataModified = [];
	// getCurrentFilenames();
	console.log("data.images");
	console.log(data);
	for (let i = 0; i < data.images.length; i++) {
		fs.rename(__dirname + "/../../../client/src/uploads/" + data.images[i], __dirname + "/../../../client/src/uploads/" + rnd + "_" + data.images[i], (err) => {
			if (err) throw err;
			else {
				console.log("REname complete");
			}
		});

		dataModified[i] = rnd + "_" + data.images[i];
	}
	console.log("dataModified");
	console.log(dataModified);
	etablissement
		.create({ nom, description, adresse, ville, manager, image: dataModified[0] })
		.then((etablissement) => {
			console.log("etablissement crée!");
			console.log(JSON.stringify(etablissement, null, 2));
			res.status(200).json({ etablissement });
		})
		.catch((err) => console.log("loupé", err));
};
exports.deleteEtablissement = (req, res) => {
	etablissement.destroy({ where: { id: req.params.id } }).then((etablissement) => {
		console.log("etablissement supprimé!");
		console.log(JSON.stringify(etablissement, null, 2));
		res.status(200).json({ etablissement });
	});
};
exports.updateEtablissement = (req, res) => {
	const { nom, description, adresse, ville } = req.body;
	etablissement.update({ nom, description, adresse, ville }, { where: { id: req.params.id } }).then((etablissement) => {
		console.log("etablissement modifié!");
		console.log(JSON.stringify(etablissement, null, 2));
		res.status(200).json({ etablissement });
	});
};
exports.affectManagerEtablissement = (req, res) => {
	console.log("affectation de manager");
	const { userId } = req.body;
	etablissement.update({ userId }, { where: { id: req.params.id } }).then((etablissement) => {
		console.log(user + "manager affecté à l'établissement" + req.params.id);
		console.log(JSON.stringify(etablissement, null, 2));
		res.status(200).json({ message: etablissement });
	});
};
exports.userToManager = (req, res) => {
	console.log("coucou");
	role.findAll().then((roles) => {
		const manager = [...roles];
		manager.pop();
		// console.log(manager);
		//MAJ du user en manager

		user_roles.create({ userId: req.params.id, roleId: 2 }).then((e) => {
			console.log("transformation en manager!!");
			res.status(200).json({ message: e });
		});
	});
};
exports.managerToUser = (req, res) => {
	console.log("coucou");

	user_roles.destroy({ where: { userId: req.params.id, roleId: 2 } }).then((e) => {
		console.log("transformation en user!!");
		res.status(200).json({ message: e });
	});
};

exports.postEtablissementImage = (req, res) => {
	console.log("post images");
	console.log("req");
	console.log(req.files);
	if (!req.files) {
		res.send({
			status: false,
			message: "No file uploaded",
		});
	} else {
		console.log("req");
		console.log(req.files);
		//Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
		let avatar = req.files.file;
		// const rnd= Math.random()
		//Use the mv() method to place the file in upload directory (i.e. "uploads")
		avatar.mv("../client/src/uploads/" + avatar.name);
		// avatar.mv('./uploads/' + rnd+avatar.name);

		//send response
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
	}
};
