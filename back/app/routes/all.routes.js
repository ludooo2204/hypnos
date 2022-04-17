const { authJwt } = require("../middleware");
let admin_route = require("./admin.routes");
let manager_route = require("./manager.routes");
let user_route = require("./user.routes");
let sendMail_route = require("./sendMail.routes");
let signinAuto_route = require("./signinAuto.routes");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});

	app.use("/sendmail", sendMail_route);

	app.use("/auth/signinAuto", [authJwt.verifyToken], signinAuto_route);

	app.use("/admin", admin_route);
	app.use("/manager", manager_route);
	app.use("/user", user_route);
};
