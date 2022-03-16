// const db = require("../models");
// const Tag = db.tag;

exports.allAccess = (req, res) => {
	console.log("ALLLCAAAAAACCCCSESEEESSS");
	res.status(200).send("Public Content");
};
// exports.getTags = (req, res) => {
// 	console.log("get tag?");
// 	Tag.findAll()
// 		.then((tag) => {
// 			console.log(JSON.stringify(tag));
// 			res.status(200).send(JSON.stringify(tag));
// 		})

// 		.catch((err) => console.log("EEEERRRROOOORrrr"));
// };
exports.userBoard = (req, res) => {
	res.status(200).send("User Content");
};
exports.adminBoard = (req, res) => {
	res.status(200).send("Admin Content");
};
