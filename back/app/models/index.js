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

db.role.belongsToMany(db.user, {
	through: "user_roles",
});
db.user.belongsToMany(db.role, {
	through: "user_roles",
});

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

db.ROLES = ["user", "manager", "admin"];

module.exports = db;
