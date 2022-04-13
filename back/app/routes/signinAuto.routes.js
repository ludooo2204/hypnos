let express = require("express");
let router = express.Router();

const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


router.get("/",  (req, res) => {
	console.log("test signAuto");
	console.log("test signAuto");
	console.log("test signAuto");
	console.log("test signAuto");
	console.log("test signAuto");
	console.log("test signAuto");
	console.log("req.body.email")
	console.log(req.roles)
	console.log(req.email)
	console.log(req.userId)
	User.findOne({
		where: {
			email: req.email,
		},
	})
		.then((user) => {
			// console.log("user from signauto")
			// console.log(JSON.stringify(user,null,2))
			if (!user) {
				return res.send({ message: "Cet email n'existe pas !" });
			}
		
		;
			var authorities = [];
          
			user.getRoles().then((roles) => {
				// console.log("roles");
				// console.log(JSON.stringify(roles, null, 2));
				for (let i = 0; i < roles.length; i++) {
					authorities.push("ROLE_" + roles[i].name.toUpperCase());
				}
				console.log("authorities");
				console.log(authorities);
				// if (user.email == "lolo") authorities.push("ROLE_ADMIN");
				// req.toto="totoe"
				res.status(200).send({
					id: user.id,
					email: user.email,
					roles: authorities,
					// accessToken: token,
				});
			});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
    })
    module.exports = router;