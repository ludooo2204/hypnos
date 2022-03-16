module.exports = (sequelize, Sequelize) => {
	const ResetTokens = sequelize.define("ResetTokens", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: Sequelize.STRING,
			defaultValue: null,
		},
		token: {
			type: Sequelize.STRING,
			defaultValue: null,
		},
		expiration: {
			type: Sequelize.DATE,
			defaultValue: null,
		},
		used: {
			type: Sequelize.INTEGER,
			defaultValue: "0",
		},
	});
	return ResetTokens;
};
