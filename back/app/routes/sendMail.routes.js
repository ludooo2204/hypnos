let express = require("express");
let router = express.Router();
const sendEMail = require("../utils/email/sendMail");
router.post("/", async function (req, res, next) {
	const { sujet, nom, prenom, adresse, demande } = req.body.demandeComplete;
	// //create email
	const text = `${prenom} ${nom} vous sollicite au sujet de \n\n ${demande}\n\n vous pouvez le contacter ici => ${adresse}`;
	const message = {
		from: process.env.EMAIL,
		to: "admin@lomano.fr",
		subject: sujet,
		text,
	};

	sendEMail(message);

	return res.json({ status: "ok" });
});
module.exports = router;
