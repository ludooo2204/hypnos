const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const fileUpload = require("express-fileupload");
var bcrypt = require("bcryptjs");

const path = require("path");
const config = require("./app/config/db.config");
const mysql = require("mysql2/promise");

const fakeData = require("./app/config/fakeData");
console.log(fakeData);
// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
);

console.log("coucou");
var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors());
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

mysql
	.createConnection({
		user: config.USER,
		password: config.PASSWORD,
	})
	.then((connection) => {
		connection.query(`CREATE DATABASE IF NOT EXISTS ${config.DB};`);
	})
	.then(() => {
		// database
		const db = require("./app/models");

		// const Role = db.role;

		db.sequelize
			.sync({ force: true })
			.then(() => {
				db.role.findAll({ where: { id: 1 } }).then((e) => {
					if (e.length != 1) {
						db.role.create({
							id: 1,
							name: "user",
						});
						db.role.create({
							id: 2,
							name: "manager",
						});
						db.role.create({
							id: 3,
							name: "admin",
						});
					}
				});
			})
			.then(() => {
				// Creation de l'admin
				const emailAdmin = "admin@lomano.fr";
				let vachonId;
				let etablissementChatelleraultId;
				// console.log(db);
				db.user
					.findAll({ where: { email: emailAdmin } })
					.then((e) => {
						if (e.length != 1) {
						
							db.user
								.create({
									nom: emailAdmin,
									prenom: emailAdmin,
									email: emailAdmin,
									password: bcrypt.hashSync("admin", 8),
								})
								.then((user) => {
								
									db.sequelize.models.user_roles
										.bulkCreate([
											{ userId: user.id, roleId: 1 },
											{ userId: user.id, roleId: 2 },
											{ userId: user.id, roleId: 3 },
										])
										.then((e) => {
											console.log("admin créé!!");
										});
								})

								.catch((err) => {
									console.log(err);
								});

							//creation de user fictif (pour avoir de potentiel manager)
							for (const fakeUser of fakeData.fakeData.users) {
								db.user
									.create({
										nom: fakeUser.nom,
										prenom: fakeUser.prenom,
										email: fakeUser.email,
										password: bcrypt.hashSync("foot", 8),
									})
									.then((user) => {
										db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).then((e) => {
											console.log("role client!!");
										});
									});
							}
					
							db.user
								.create({
									nom: fakeData.fakeData.fakeChatellerault.user.nom,
									prenom: fakeData.fakeData.fakeChatellerault.user.prenom,
									email: fakeData.fakeData.fakeChatellerault.user.email,
									password: bcrypt.hashSync("foot", 8),
								})
								.then((user) => {
									console.log("user ludo :", user.id);
									vachonId = user.id;
									db.sequelize.models.user_roles
										.create({ userId: user.id, roleId: 1 })
										.then((e) => {
											console.log("role client!!");
										})
										.then(() => {
											db.etablissement
												.create({
													nom: fakeData.fakeData.fakeChatellerault.nom,
													description: fakeData.fakeData.fakeChatellerault.description,
													adresse: fakeData.fakeData.fakeChatellerault.adresse,
													ville: fakeData.fakeData.fakeChatellerault.ville,
													image: fakeData.fakeData.fakeChatellerault.image,
													userId: vachonId,
												})
												.then((a) => {
													etablissementChatelleraultId = a.id;
													db.sequelize.models.user_roles
														.create({ userId: a.userId, roleId: 2 })
														.then((e) => {
															console.log("role manager!!");
														})
														.then(() => {
															for (const fakeSuite of fakeData.fakeData.suites) {
																db.suite
																	.create(
																		{
																			nom: fakeSuite.nom,
																			imageMiseEnAvant: fakeSuite.imageMiseEnAvant,
																			prix: fakeSuite.prix,
																			description: fakeSuite.description,
																			UrlBooking: fakeSuite.UrlBooking,
																			images: fakeSuite.images,
																			etablissementId: etablissementChatelleraultId,
																		},
																		{
																			include: [db.image],
																		}
																	)
																	.then(() => console.log("une suite a été crée"))
																	.catch((err) => console.log(err));
															}
														})
														.then(() => {
															for (const fakeReservation of fakeData.fakeData.reservations) {
																db.reservation
																	.create({ dateDebut: fakeReservation.dateDebut, dateFin: fakeReservation.dateFin, userId: fakeReservation.userId, suiteId: fakeReservation.suiteId })
																	.then((resa) => console.log("une reservation a été crée"))
																	.catch((err) => console.log(err));
															}
														});
												})
												.catch((err) => console.log("errrrrrrrrrrrrrrr", err));
										});
								});
							console.log("Fake users créé !");
						}
					})

					.then(() => {
						for (const fakeEtablissement of fakeData.fakeData.etablissements) {
							db.etablissement
								.create({ nom: fakeEtablissement.nom, description: fakeEtablissement.description, adresse: fakeEtablissement.adresse, ville: fakeEtablissement.ville, image: fakeEtablissement.image, userId: fakeEtablissement.userId })
								.then((a) => {
									console.log("un etablissement a été crée");
									console.log("hotel ",a.nom," user ",a.userId);
									db.sequelize.models.user_roles.create({ userId: a.userId, roleId: 2 }).then((e) => {
										console.log("role manager!!");
									});
								})
								.catch((err) => console.log("errrrrrrrrrrrrrrr", err));
						}
					});

				// .then(() => {
				// 	for (const fakeSuite of fakeData.fakeData.suites) {
				// 		db.suite
				// 			.create(
				// 				{
				// 					nom: fakeSuite.nom,
				// 					imageMiseEnAvant: fakeSuite.imageMiseEnAvant,
				// 					prix: fakeSuite.prix,
				// 					description: fakeSuite.description,
				// 					UrlBooking: fakeSuite.UrlBooking,
				// 					images: fakeSuite.images,
				// 					etablissementId: fakeSuite.etablissementId,
				// 				},
				// 				{
				// 					include: [db.image],
				// 				}
				// 			)
				// 			.then(() => console.log("une suite a été crée"))
				// 			.catch((err) => console.log(err));
				// 	}
				// })
				// .then(() => {
				// 	for (const fakeReservation of fakeData.fakeData.reservations) {
				// 		db.reservation
				// 			.create({ dateDebut: fakeReservation.dateDebut, dateFin: fakeReservation.dateFin, userId: fakeReservation.userId, suiteId: fakeReservation.suiteId })
				// 			.then((resa) => console.log("une reservation a été crée"))
				// 			.catch((err) => console.log(err));
				// 	}
				// });
			});
		// force: true will drop the table if it already exists
		// db.sequelize.sync({force: true}).then(() => {
		//   console.log('Drop and Resync Database with { force: true }');

		// routes
		require("./app/routes/all.routes")(app);
		require("./app/routes/auth.routes")(app);
	});

// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
