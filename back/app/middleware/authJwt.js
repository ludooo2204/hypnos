const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
	console.log("coucou ludo");
	let token = req.headers["x-access-token"];
	console.log("token");
	console.log(token);
	if (!token) {
		return res.status(403).send({
			message: "No token provided!",
		});
	}
	jwt.verify(token, config.secret, (err, decoded) => {
		console.log("decoded");
		console.log("decoded");
		console.log("decoded");
		console.log("decoded");
		console.log(decoded);
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}
		console.log("token decodé !");
		console.log("token decodé !");
		console.log("token decodé !");
		console.log("token decodé !");
		let rolesTemp = [];
		User.findAll({ where: { email: decoded.email } }).then((user) => {
			console.log("trouvé");
			console.log("trouvé");
			console.log("trouvé");
			console.log("trouvé");
			console.log("trouvé");
			console.log(JSON.stringify(user, null, 2));

			user[0].getRoles().then((roles) => {
				for (let i = 0; i < roles.length; i++) {
					rolesTemp.push(roles[i].name);
				}
				req.roles = rolesTemp;
				req.userId = user[0].id;
				req.email = decoded.email;
				// req.password = decoded.password;

				next();
			});
		});
	});
};
isAdmin = (req, res, next) => {
	console.log("IsAdmin ");
	console.log("IsAdmin ");
	console.log("IsAdmin ");
	console.log("IsAdmin ");
	console.log("IsAdmin ");
	let token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({
			message: "No token provided!",
		});
	}
	jwt.verify(token, config.secret, (err, decoded) => {
		console.log("decoded");
		console.log(decoded);
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}
		let rolesTemp = [];
		User.findAll({ where: { email: decoded.email } }).then((user) => {

			user[0].getRoles().then((roles) => {
				for (let i = 0; i < roles.length; i++) {
					rolesTemp.push(roles[i].name);
				}
				if (rolesTemp.includes("admin")) {
					console.log("ta les droits !!!");
					next();
				} else {
					return res.status(401).send({
						message: "ta pas les droits des admins!!!",
					});
				}
			});
		});
	});
};
isManager = (req, res, next) => {
	console.log("ISmanager ");
	console.log("ISmanager ");
	console.log("ISmanager ");
	console.log("ISmanager ");
	let token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({
			message: "No token provided!",
		});
	}
	jwt.verify(token, config.secret, (err, decoded) => {
		console.log("decoded");
		console.log(decoded);
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}
		let rolesTemp = [];
		User.findAll({ where: { email: decoded.email } }).then((user) => {
			console.log("trouvé");
			console.log("trouvé");
			console.log("trouvé");
			console.log("trouvé");
			console.log("trouvé");
			console.log(JSON.stringify(user, null, 2));

			user[0].getRoles().then((roles) => {
				for (let i = 0; i < roles.length; i++) {
					rolesTemp.push(roles[i].name);
				}
				console.log("rolesTemp");
				console.log("rolesTemp");
				console.log(rolesTemp);
				if (rolesTemp.includes("manager") && !rolesTemp.includes("admin")) {
					console.log("ta les droits !!!");
					next();
				} else {
					return res.status(401).send({
						message: "ta pas les droits des droits de manager !!!",
					});
				}
			});
		});
	});
};

const authJwt = {
	verifyToken,
	isAdmin,
	isManager,
};
module.exports = authJwt;
