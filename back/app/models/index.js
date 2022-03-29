const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,
	//desactive les log
	logging: false,
	// pool: {
	//   max: config.pool.max,
	//   min: config.pool.min,
	//   acquire: config.pool.acquire,
	//   idle: config.pool.idle
	// }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.etablissement = require("./etablissement.model.js")(sequelize, Sequelize);
db.suite = require("./suite.model.js")(sequelize, Sequelize);
db.image = require("./image.model.js")(sequelize, Sequelize);
db.reservation = require("./reservation.model.js")(sequelize, Sequelize);

// db.ResetTokens = require("../models/ResetTokens.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
	through: "user_roles",
});
db.user.belongsToMany(db.role, {
	through: "user_roles",
});

//manager-etablissement
db.user.hasOne(db.etablissement);
db.etablissement.belongsTo(db.user);

db.etablissement.hasMany(db.suite);
db.suite.belongsTo(db.etablissement);

db.suite.hasMany(db.reservation);
db.reservation.belongsTo(db.suite);

db.user.hasMany(db.reservation);
db.reservation.belongsTo(db.user);

db.suite.hasMany(db.image);
db.image.belongsTo(db.suite);

//sertcheckRolesExisted
db.ROLES = ["user", "manager", "admin"];


// Creation de l'admin
// const emailAdmin = "admin";
// db.user.findAll({ where: { email: emailAdmin } }).then((e) => {
// 	if (e.length != 1) {
// 		console.log("coucoud")
// 		db.user
// 			.create({
// 				nom:emailAdmin,
// 				prenom:emailAdmin,
// 				email: emailAdmin,
// 				password: bcrypt.hashSync("admin", 8),
// 			})
// 			.then((user) => {
// 				console.log("user");
// 				console.log(user.id);
// 				db.sequelize.models.user_roles.bulkCreate([{ userId: user.id, roleId: 1 }, { userId: user.id, roleId: 2 }, { userId: user.id, roleId: 3 }])
// 				.then((e) => {
// 					console.log("admin créé!!");
// 				});
// 			})

// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}
// });







// Creation de etablissement
// db.etablissement
// 	.create({ nom: "Hotel de chatellerault", description: "bel hotel", adresse: "47 impasse marcel 86100 chatellerault", ville: "chtellerault" })
// 	.then((a) => {
// 		console.log(a, "un etablissement a été crée");
// 	})
// 	.catch((err) => console.log("err", err));
// db.etablissement
// 	.create({ nom: "Hotel de poitiers", description: "bel hotel", adresse: "47 impasse marcel 86100 chatellerault", ville: "chtellerault" })
// 	.then((a) => {
// 		console.log(a, "un etablissement a été crée");
// 	})
// 	.catch((err) => console.log("err", err));
// db.user
// 	.create({ username: "ludo", email: "vachon.ludo@gmail.com", password: "toto" })
// 	.then((a) => {
// 		console.log(a, "un user a été creer");
// 	})
// 	.catch((err) => console.log("err", err));

// affectation de gerant
// const user_etablissement = db.sequelize.models.user_etablissement;
// user_etablissement
// 	.create({ userId:1, etablissementId:3 })
// 	.then(() => console.log("creation relation user_etablissement effecté"))
// 	.catch((err) => console.log("err", err));
// user_etablissement
// 	.create({ userId:3, etablissementId:1 })
// 	.then(() => console.log("creation relation user_etablissement effecté"))
// 	.catch((err) => console.log("err", err));

// db.etablissement
// 	.findAll({
// 		model: db.etablissement,
// 		attributes: { exclude: ["createdAt", "updatedAt"] },
// 		include: [{ model: db.user, attributes: { exclude: ["password", "createdAt", "updatedAt"] } }],
// 	})
// 	.then((e) => {
// 		console.log(JSON.stringify(e, null, 2));
// 	});

// db.user
// 	.findAll({
// 		model: db.user,
// 		attributes: { exclude: ["createdAt", "updatedAt","password",] },
// 		include: [{ model: db.etablissement, attributes: { exclude: ["createdAt", "updatedAt"] } }],
// 	})
// 	.then((e) => {
// 		console.log(JSON.stringify(e, null, 2));
// 	});
module.exports = db;
