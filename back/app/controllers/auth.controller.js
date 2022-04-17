const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const user_roles = db.sequelize.models.user_roles;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
	// Save User to Database
	User.create({
		nom: req.body.email,
		prenom: req.body.prenom,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
	})
		.then((user) => {
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
				console.log("roles");
				for (let i = 0; i < roles.length; i++) {
					authorities.push("ROLE_" + roles[i].name.toUpperCase());
				}
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
