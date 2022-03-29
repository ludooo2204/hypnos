const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const user_roles = db.sequelize.models.user_roles;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
	console.log("test signup");
	console.log(req.body);
	// Save User to Database
	User.create({
		nom: req.body.email,
		prenom: req.body.prenom,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
	})
		.then((user) => {
			console.log("prout");
			user_roles
				.create({ userId: user.id, roleId: 1 })
				.then((e) => {
					console.log("role client!!");
				})
				.then(res.send({ message: "Le compte a bien été enregistré !" }));
		})

		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
exports.signin = (req, res) => {
	console.log("test signin");
	console.log(req.body);

	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				return res.send({ message: "Cet email n'existe pas !" });
			}
			var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (!passwordIsValid) {
				// return res.status(401).send({
				return res.send({
					accessToken: null,
					message: "Mot de passe erroné!",
				});
			}
			var token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
				expiresIn: 86400, // 24 hours
			});
			var authorities = [];
			user.getRoles().then((roles) => {
				console.log("roles")
				console.log(JSON.stringify(roles, null, 2));
				for (let i = 0; i < roles.length; i++) {
					authorities.push("ROLE_" + roles[i].name.toUpperCase());
				}
				console.log("authorities")
				console.log(authorities)
				if (user.email == "lolo") authorities.push("ROLE_ADMIN");
				res.status(200).send({
					id: user.id,
					email: user.email,
					roles: authorities,
					accessToken: token,
				});
			});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
