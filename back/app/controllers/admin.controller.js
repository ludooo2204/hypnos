const db = require("../models");
const user = db.user;
const role = db.role;
const suite = db.suite;
const etablissement = db.etablissement;
const user_roles = db.sequelize.models.user_roles;

exports.getmanagers = (req, res) => {
	console.log("coucou from get");
	user.findAll({
		model: user,
		attributes: { exclude: ["createdAt", "updatedAt", "password"] },
		include: [{ model: role, attributes: { exclude: ["createdAt", "updatedAt"] } }],
	}).then((manager) => {
		console.log(JSON.stringify(manager, null, 2));
		res.status(200).json({ message: manager });
	});
};
exports.getEtablissements = (req, res) => {
	etablissement
		.findAll({
			model: etablissement,
			attributes: { exclude: ["createdAt", "updatedAt"] },
			include: [{ model: suite, attributes: { exclude: ["createdAt", "updatedAt"] } }],
		})
		.then((etablissement) => {
			console.log(JSON.stringify(etablissement, null, 2));
			res.status(200).json({ message: etablissement });
		});
};

exports.postEtablissement = (req, res) => {
	const { nom, description, adresse, ville } = req.body;
	etablissement.create({ nom, description, adresse, ville }).then((etablissement) => {
		console.log("etablissement crée!");
		console.log(JSON.stringify(etablissement, null, 2));
		res.status(200).json({ message: etablissement });
	});
};
exports.deleteEtablissement = (req, res) => {
	etablissement.destroy({ where: { id: req.params.id } }).then((etablissement) => {
		console.log("etablissement supprimé!");
		console.log(JSON.stringify(etablissement, null, 2));
		res.status(200).json({ message: etablissement });
	});
};
exports.updateEtablissement = (req, res) => {
	const { nom, description, adresse, ville } = req.body;
	etablissement.update({ nom, description, adresse, ville }, { where: { id: req.params.id } }).then((etablissement) => {
		console.log("etablissement modifié!");
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
