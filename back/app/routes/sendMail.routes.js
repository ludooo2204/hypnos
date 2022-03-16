let express = require("express");
let router = express.Router();
const sendEMail = require('../utils/email/sendMail');
console.log("sendEMail")
console.log(sendEMail)
router.get("/", (req, res) => {
    console.log("j'envoi le mail")
    console.log("sendEMail")
// console.log(sendEMail())

	// sendMail(
  //       "vachon.ludovic@gmail.com",
  //       "Email subject",
  //       { name: "Eze" },
  //       "./template/requestResetPassword.handlebars"
  //     );
});
module.exports = router;
