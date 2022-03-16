const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
let creations_route = require("./creation.routes");
// let sendMail_route = require("./sendMail.routes");
// let forgotPassword = require("./forgotPassword.routes");
// let forgotLogin = require("./forgotLogin.routes");
// let resetPassword = require("./resetPassword.routes");
// let signinAuto_route = require("./signinAuto.routes");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});

	// partie visiteur
	app.use("/api/creations",  creations_route);
	// app.use("/api/sendmail", sendMail_route);
	// app.use("/api/forgot-password", forgotPassword);
	// app.use("/api/forgot-login", forgotLogin);
	// app.use("/api/reset-password", resetPassword);

	// partie utilisateur connecté
	// app.use("/api/signinAuto", [authJwt.verifyToken, authJwt.isAdmin], signinAuto_route);

	// partie Admin
	// app.use("/api/admin/tags", [authJwt.verifyToken, authJwt.isAdmin], tag_route);
	app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};
