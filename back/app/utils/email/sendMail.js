const nodemailer = require("nodemailer");

require("dotenv").config();

const sendEMail = async (message) => {
	const options = {
		host: "node183-eu.n0c.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
	};
	let transporter = nodemailer.createTransport(options);
	transporter.verify((err, success) => {
		if (err) {
			console.log("err");
			console.log(err);
		} else {
			console.log("serveur pret a prendre les messages !");
		}
	});

	let info = await transporter.sendMail(message);
	console.log("message envoyé");
	console.log(info.messageId);
};

module.exports = sendEMail;
