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
const { etablissement } = require("./app/models");
// console.log(fakeData);
// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
);

// console.log("coucou");
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
		const db = require("./app/models");

		db.sequelize.sync({ force: true }).then(() => {
			db.role.findAll({ where: { id: 1 } }).then((e) => {
				if (e.length != 1) {
					db.role
						.bulkCreate([
							{ id: 1, name: "user" },
							{ id: 2, name: "manager" },
							{ id: 3, name: "admin" },
						])
						.catch((err) => console.log("err1", err))
						.then(() => {
							console.log("roles user/manager/admin crée");

							// Creation de l'admin
							const emailAdmin = "admin@lomano.fr";
							let vachonId;
							db.user
								.findAll({ where: { email: emailAdmin } })
								.catch((err) => console.log("err2", err))

								.then((e) => {
									if (e.length != 1) {
										db.user
											.create({
												nom: emailAdmin,
												prenom: emailAdmin,
												email: emailAdmin,
												password: bcrypt.hashSync("admin", 8),
											})
											.catch((err) => {
												console.log("err3", err);
											})
											.then((user) => {
												console.log("admin créé");

												db.sequelize.models.user_roles
													.bulkCreate([
														{ userId: user.id, roleId: 1 },
														{ userId: user.id, roleId: 2 },
														{ userId: user.id, roleId: 3 },
													])
													.catch((err) => {
														console.log("err4", err);
													})
													.then((e) => {
														console.log("role de l'admin créé");
														console.log(JSON.stringify(e, null, 2));

														//C4est ici que ca se passe !!! comment changer cette boucle ????

														//creation de user fictif (pour avoir des manager)
														for (const fakeUser of fakeData.fakeData.users) {
															db.user
																.create({
																	nom: fakeUser.nom,
																	prenom: fakeUser.prenom,
																	email: fakeUser.email,
																	password: bcrypt.hashSync("foot", 8),
																})
																.catch((err) => console.log("err5", err))
																.then((user) => {
																	db.sequelize.models.user_roles
																		.bulkCreate([
																			{ userId: user.id, roleId: 1 },
																			{ userId: user.id, roleId: 2 },
																		])
																		.catch((err) => {
																			console.log("err6", err);
																		});
																});
														}
														//creation clients
														db.user
															.create({
																nom: "tom",
																prenom: "tartuffe",
																email: "tom.tartuffe@gmail.com",
																password: bcrypt.hashSync("foot", 8),
															})
															.catch((err) => console.log("err5", err))
															.then((user) => {
																db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).catch((err) => {
																	console.log("err6", err);
																});
															});
														db.user
															.create({
																nom: "john",
																prenom: "doe",
																email: "john.doe@gmail.com",
																password: bcrypt.hashSync("foot", 8),
															})
															.then((user) => {
																db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).catch((err) => {
																	console.log("err6", err);
																});
															});
														db.user
															.create({
																nom: "dimitri",
																prenom: "dokokoe",
																email: "dokokoe.dmitri@gmail.com",
																password: bcrypt.hashSync("foot", 8),
															})
															.then((user) => {
																db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).catch((err) => {
																	console.log("err6", err);
																});
															});
														db.user
															.create({
																nom: "paul",
																prenom: "jon",
																email: "paul.jon@gmail.com",
																password: bcrypt.hashSync("foot", 8),
															})
															.then((user) => {
																db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).catch((err) => {
																	console.log("err6", err);
																});
															});
														db.user
															.create({
																nom: "marie",
																prenom: "tata",
																email: "marie.tata@gmail.com",
																password: bcrypt.hashSync("foot", 8),
															})
															.then((user) => {
																db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).catch((err) => {
																	console.log("err6", err);
																});
															});
														db.user
															.create({
																nom: "tom",
																prenom: "dtomoe",
																email: "tom.tom@gmail.com",
																password: bcrypt.hashSync("foot", 8),
															})
															.then((user) => {
																db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).catch((err) => {
																	console.log("err6", err);
																});
															});
														//creation du user ludo sur chatellerault
														db.user
															.create({
																nom: fakeData.fakeData.fakeChatellerault.user.nom,
																prenom: fakeData.fakeData.fakeChatellerault.user.prenom,
																email: fakeData.fakeData.fakeChatellerault.user.email,
																password: bcrypt.hashSync("foot", 8),
															})
															.catch((err) => console.log("err7", err))

															.then((user) => {
																vachonId = user.id;
																console.log("user ludo vachon créé");
																db.sequelize.models.user_roles
																	.bulkCreate([
																		{ userId: user.id, roleId: 1 },
																		{ userId: user.id, roleId: 2 },
																	])
																	.catch((err) => {
																		console.log("err6", err);
																	})

																	.then(() => {
																		//Creation de l'etablissement de chatellerault
																		db.etablissement
																			.create({
																				nom: fakeData.fakeData.fakeChatellerault.nom,
																				description: fakeData.fakeData.fakeChatellerault.description,
																				adresse: fakeData.fakeData.fakeChatellerault.adresse,
																				ville: fakeData.fakeData.fakeChatellerault.ville,
																				image: fakeData.fakeData.fakeChatellerault.image,
																				userId: vachonId,
																			})
																			.catch((err) => console.log("err9", err))

																			.then((etablissementChatellerault) => {
																				console.log("etablissement de chatellerault créé");
																				console.log(JSON.stringify(etablissementChatellerault, null, 2));
																				///creation des suite de chatellerault
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
																								etablissementId: etablissementChatellerault.id,
																							},
																							{
																								include: [db.image],
																							}
																						)
																						// .then(() => {
																						// 	console.log("une suite a été crée");
																						// })
																						.catch((err) => console.log("err10", err));
																				}
																			})
																			.then(() => {
																				// on crée les reservations a chatellerault
																				for (const fakeReservation of fakeData.fakeData.reservations) {
																					db.reservation.create({ dateDebut: fakeReservation.dateDebut, dateFin: fakeReservation.dateFin, userId: fakeReservation.userId, suiteId: fakeReservation.suiteId }).catch((err) => console.log("err11", err));
																					// .then((resa) => console.log("une reservation a été crée"));
																				}
																			})
																			.then(() => {
																				for (const fakeEtablissement of fakeData.fakeData.etablissements) {
																					db.etablissement
																						.create({
																							nom: fakeEtablissement.nom,
																							description: fakeEtablissement.description,
																							adresse: fakeEtablissement.adresse,
																							ville: fakeEtablissement.ville,
																							image: fakeEtablissement.image,
																							userId: fakeEtablissement.userId,
																						})

																						.catch((err) => console.log("err12", err));
																				}
																			});
																	});

																// })
															});
													});
											});
									}
								});
						});
				}
			});
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
