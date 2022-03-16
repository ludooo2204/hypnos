let express = require("express");
let router = express.Router();
const sendMail = require("../utils/email/sendMail");
const db = require("../models");
const User = db.user;

router.post("/", async function (req, res, next) {
    console.log("req.body.email")
    console.log(req.body.email)

	//ensure that you have a user with this email
	var user = await User.findOne({ where: { email: req.body.email } });
	if (user == null) {
		/**
		 * we don't want to tell attackers that an
		 * email doesn't exist, because that will let
		 * them use this form to find ones that do
		 * exist.
		 **/
		return res.json({ status: "ok" });
	}
console.log("user")
console.log(user.username)

	//create email
	const message = {
		from: process.env.EMAIL,
		to: req.body.email,
		subject: "Votre identifiant pour LesLoisirsCréatifsDeChristèle",
		text: "L'identifiant associé à votre adresse mail est \""+user.username+"\".\n\n A très bientôt",
	};


sendMail(message)

	return res.json({ status: "ok"});
});



module.exports = router;
