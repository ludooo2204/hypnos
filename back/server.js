const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const fileUpload = require("express-fileupload");
var bcrypt = require("bcryptjs");

const path = require("path");
const config = require("./app/config/db.config");
const mysql = require("mysql2/promise");

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
				const emailAdmin = "admin";
				// console.log(db);
				db.user
					.findAll({ where: { email: emailAdmin } })
					.then((e) => {
						if (e.length != 1) {
							console.log("coucoud");
							db.user
								.create({
									nom: emailAdmin,
									prenom: emailAdmin,
									email: emailAdmin,
									password: bcrypt.hashSync("admin", 8),
								})
								.then((user) => {
									console.log("user");
									console.log(user.id);
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
							db.user
								.create({
									nom: "Pogba",
									prenom: "paul",
									email: "pogba@gmail.com",
									password: bcrypt.hashSync("foot", 8),
								})
								.then((user) => {
									db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).then((e) => {
										console.log("role client!!");
									});
								});
							db.user
								.create({
									nom: "Mbappe",
									prenom: "killian",
									email: "killian@gmail.com",
									password: bcrypt.hashSync("foot", 8),
								})
								.then((user) => {
									db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).then((e) => {
										console.log("role client!!");
									});
								});
							db.user
								.create({
									nom: "Lloris",
									prenom: "hugo",
									email: "lloris@gmail.com",
									password: bcrypt.hashSync("foot", 8),
								})
								.then((user) => {
									db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).then((e) => {
										console.log("role client!!");
									});
								});
							db.user
								.create({
									nom: "Griezman",
									prenom: "antoine",
									email: "griezman@gmail.com",
									password: bcrypt.hashSync("foot", 8),
								})
								.then((user) => {
									db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).then((e) => {
										console.log("role client!!");
									});
								});
							db.user
								.create({
									nom: "ben yedder",
									prenom: "wissam",
									email: "benyeder@gmail.com",
									password: bcrypt.hashSync("foot", 8),
								})
								.then((user) => {
									db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).then((e) => {
										console.log("role client!!");
									});
								});
							db.user
								.create({
									nom: "Giroud",
									prenom: "paul",
									email: "giroud@gmail.com",
									password: bcrypt.hashSync("foot", 8),
								})
								.then((user) => {
									db.sequelize.models.user_roles.create({ userId: user.id, roleId: 1 }).then((e) => {
										console.log("role client!!");
									});
								});

							console.log("coucou ludo");
						}
					})
					.then(() => {
						// Creation de etablissement
						db.etablissement
							.create({ nom: "Hotel de chatellerault", description: "bel hotel", adresse: "47 impasse marcel 86100 chatellerault", ville: "chtellerault", image: "etablissement_1.jpg", userId: 2 })
							.then((a) => {
								console.log("un etablissement a été crée");
							})
							.catch((err) => console.log("err", err));
						db.etablissement
							.create({ nom: "Hotel de poitiers", description: "bel hotel", adresse: "47 impasse marcel 86100 poitiers", ville: "poitiers", image: "etablissement_2.jpg", userId: 3 })
							.then((a) => {
								console.log("un etablissement a été crée");
							})
							.catch((err) => console.log("err", err));
						db.etablissement
							.create({ nom: "Hotel de Paris", description: "hotel bof", adresse: "47 imp paris", ville: "paris", image: "etablissement_3.jpg", userId: 4 })
							.then((a) => {
								console.log("un etablissement a été crée");
							})
							.catch((err) => console.log("err", err));
						db.etablissement
							.create({ nom: "Hotel de Grenible", description: "miteux hotel", adresse: "47 impasse marcel 86100 grenoble", ville: "Grenoble", image: "etablissement_4.jpg", userId: 5 })
							.then((a) => {
								console.log("un etablissement a été crée");
							})
							.catch((err) => console.log("err", err));
					})

					.then(() => {
						console.log("creation suites")
						db.suite
							.create(
								{ nom: "Cocon de Soie", imageMiseEnAvant: "suite_1.jpg", prix: 150, description: "Une suite que vous n'etes pas pret d'oublier!", UrlBooking: "www.booking.com/totolescagot", images:[{nom:"suite_2.jpg",nom:"suite_3.jpg",nom:"suite_4.jpg",nom:"suite_5.jpg"}], etablissementId: 1 },
								{
									include: [db.image],
								}
							)
							.then((suite) => {
								console.log("suite créé !!");
								console.log(JSON.stringify(suite, null, 2));
							})
							.catch(err=>console.log(err))
					});
			});
		// force: true will drop the table if it already exists
		// db.sequelize.sync({force: true}).then(() => {
		//   console.log('Drop and Resync Database with { force: true }');

		// routes
		require("./app/routes/auth.routes")(app);
		require("./app/routes/all.routes")(app);
	});

// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
