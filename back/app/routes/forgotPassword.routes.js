let express = require("express");
let router = express.Router();
const sendMail = require("../utils/email/sendMail");
const db = require("../models");
const randToken = require('rand-token');
const User = db.user;
const ResetToken = db.ResetTokens;

router.post("/", async function (req, res, next) {
    console.log("req.body.email")
    console.log(req.body.email)
	//ensure that you have a user with this email
	var email = await User.findOne({ where: { email: req.body.email } });
	if (email == null) {
		/**
		 * we don't want to tell attackers that an
		 * email doesn't exist, because that will let
		 * them use this form to find ones that do
		 * exist.
		 **/
		return res.json({ status: "ok" });
	}
	/**
	 * Expire any tokens that were previously
	 * set for this user. That prevents old tokens
	 * from being used.
	 **/
	await ResetToken.update(
		{
			used: 1,
		},
		{
			where: {
				email: req.body.email,
			},
		}
	);

	//Create a random reset token
	// var fpSalt = crypto.randomBytes(64).toString("base64");
    let RNDtoken =randToken.generate(20)

	//token expires after one hour
	var expireDate = new Date(new Date().getTime() + 60 * 60 * 1000);

	//insert token data into DB
	await ResetToken.create({
		email: req.body.email,
		expiration: expireDate,
		token: RNDtoken,
		used: 0,
	});

	//create email
	const message = {
		from: process.env.EMAIL,
		to: req.body.email,
		subject: "Réinitialisation Mot de Passe",
		text: "Pour réinitialiser votre mot de passe, merci de cliquer sur ce lien avant "+new Date(new Date().getTime() + 60 * 60 * 1000).toLocaleTimeString()+".\n\nhttp://localhost:3000/reset-password?token=" + encodeURIComponent(RNDtoken) + "&email=" + req.body.email,
	};

	//send email
	// transport.sendMail(message, function (err, info) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log(info);
	// 	}
	// });

sendMail(message)

	return res.json({ status: "ok"});
});

// router.get("/", (req, res, next) => {
// 	// res.render("user/forgot-password", {});
// });

module.exports = router;
