const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");



module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});
	app.post("/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);
	// app.post("/auth/signup",  controller.signup);
	app.post("/auth/signin", controller.signin);
	// app.post("/auth/signinAuto",  controller.signinAuto);
	// app.use("/auth/signinAuto", [authJwt.verifyToken], controller.signinAuto);
};
