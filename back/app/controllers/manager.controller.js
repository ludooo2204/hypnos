const db = require("../models");
const user = db.user;
const role = db.role;
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
exports.userToManager = (req, res) => {
	console.log("coucou");
	role.findAll().then((roles) => {
		console.log(req.params.id);
		const manager = [...roles];
		manager.pop();
		// console.log(manager);
		//MAJ du user en manager

		user_roles.create({ userId: req.params.id, roleId: 2 }).then((e) => {
			console.log("transformation !!");
			res.status(200).json({ message: e });
		});
	});
};

exports.postmanager = (req, res) => {};
exports.deletemanager = (req, res) => {};
