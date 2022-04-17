let express = require("express");
let router = express.Router();

const db = require("../models");
const User = db.user;

router.get("/", (req, res) => {
	User.findOne({
		where: {
			email: req.email,
		},
	})
		.then((user) => {
			if (!user) {
				return res.send({ message: "Cet email n'existe pas !" });
			}

			var authorities = [];

			user.getRoles().then((roles) => {
				for (let i = 0; i < roles.length; i++) {
					authorities.push("ROLE_" + roles[i].name.toUpperCase());
				}
				res.status(200).send({
					id: user.id,
					email: user.email,
					roles: authorities,
				});
			});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
});
module.exports = router;
