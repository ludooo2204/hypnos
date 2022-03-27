module.exports = (sequelize, Sequelize) => {
	const etablissement = sequelize.define("etablissement", {
	
		nom: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		adresse: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		ville: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		image: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});
	return etablissement;
};
