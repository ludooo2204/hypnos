const { authJwt } = require("../middleware");
// const controller = require("../controllers/user.controller");
let admin_route = require("./admin.routes");
let manager_route = require("./manager.routes");
let user_route = require("./user.routes");
let sendMail_route = require("./sendMail.routes");
// let forgotPassword = require("./forgotPassword.routes");
// let forgotLogin = require("./forgotLogin.routes");
// let resetPassword = require("./resetPassword.routes");
let signinAuto_route = require("./signinAuto.routes");

module.exports = function (app) {
	app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});

	// partie visiteur
	app.use("/sendmail", sendMail_route);
	// app.use("/api/forgot-password", forgotPassword);
	// app.use("/api/forgot-login", forgotLogin);
	// app.use("/api/reset-password", resetPassword);
	
	// partie utilisateur connecté
	app.use("/auth/signinAuto", [authJwt.verifyToken], signinAuto_route);
	// app.use("/auth/signinAuto", signinAuto_route);

	// partie Admin
	// app.use("/api/admin/tags", [authJwt.verifyToken, authJwt.isAdmin], tag_route);
	// app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
	// app.use("/admin/etablissement",  etablissement_route);

//Route de l'admin
	// app.use("/admin", admin_route);
	app.use("/admin",  admin_route);
//Route des managers
	// app.use("/manager",  manager_route);
	app.use("/manager", manager_route);
	app.use("/user", user_route);
};
