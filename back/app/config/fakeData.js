const fakeUsers = [
	{
		nom: "Griezman",
		prenom: "antoine",
		email: "griezman@gmail.com",
	},
	{
		nom: "Pogba",
		prenom: "paul",
		email: "pogba@gmail.com",
	},
	{
		nom: "Mbappe",
		prenom: "killian",
		email: "killian@gmail.com",
	},
	{
		nom: "Lloris",
		prenom: "hugo",
		email: "lloris@gmail.com",
	},
	{
		nom: "ben yedder",
		prenom: "wissam",
		email: "benyeder@gmail.com",
	},
	{
		nom: "Giroud",
		prenom: "paul",
		email: "giroud@gmail.com",
	},
];
const fakeEtablissements = [
	{
		nom: "Hotel de chatellerault",
		description: "bel hotel",
		adresse: "47 impasse marcel 86100 chatellerault",
		ville: "chtellerault",
		image: "etablissement_1.jpg",
		userId: 2,
	},
	{
		nom: "Hotel de poitiers",
		description: "bel hotel",
		adresse: "47 impasse marcel 86100 poitiers",
		ville: "poitiers",
		image: "etablissement_2.jpg",

		userId: 3,
	},
	{
		nom: "Hotel de Paris",
		description: "hotel bof",
		adresse: "47 imp paris",
		ville: "paris",
		image: "etablissement_3.jpg",

		userId: 4,
	},
	{
		nom: "Hotel de Grenoble",
		description: "miteux hotel",
		adresse: "47 impasse marcel 86100 grenoble",
		ville: "Grenoble",
		image: "etablissement_4.jpg",

		userId: 5,
	},
];
const fakeReservations = [
	{
		dateDebut: new Date("01/03/2021"),
		dateFin: new Date("03/03/2021"),
		userId: 2,
		suiteId: 1,
	},
	{
		dateDebut: new Date("01/08/2021"),
		dateFin: new Date("01/12/2021"),
		userId: 3,
		suiteId: 1,
	},
	{
		dateDebut: new Date("01/17/2021"),
		dateFin: new Date("01/28/2021"),
		userId: 4,
		suiteId: 1,
	},
	{
		dateDebut: new Date("02/03/2021"),
		dateFin: new Date("02/05/2021"),
		userId: 2,
		suiteId: 2,
	},
	{
		dateDebut: new Date("01/07/2021"),
		dateFin: new Date("01/13/2021"),
		userId: 3,
		suiteId: 2,
	},
	{
		dateDebut: new Date("02/03/2021"),
		dateFin: new Date("02/06/2021"),
		userId: 4,
		suiteId: 2,
	},
	{
		dateDebut: new Date("01/03/2021"),
		dateFin: new Date("06/03/2021"),
		userId: 4,
		suiteId: 3,
	},
	{
		dateDebut: new Date("01/03/2021"),
		dateFin: new Date("06/03/2021"),
		userId: 5,
		suiteId: 3,
	},
	{
		dateDebut: new Date("01/03/2021"),
		dateFin: new Date("06/03/2021"),
		userId: 5,
		suiteId: 3,
	},
];
const fakeSuites = [
	{
		nom: "Cocon de Soie",
		imageMiseEnAvant: "suite_1.jpg",
		prix: 150,
		description: "Une suite que vous n'etes pas pret d'oublier!",
		UrlBooking: "www.booking.com/totolescagot",
		images: [{ nom: "suite_2.jpg" }, { nom: "suite_3.jpg" }, { nom: "suite_4.jpg" }, { nom: "suite_5.jpg" }],
		etablissementId: 1,
	},
	{
		nom: "Cocon de Velours",
		imageMiseEnAvant: "suite_5.jpg",
		prix: 150,
		description: "Ambiance chaleureuse garantie!",
		UrlBooking: "www.booking.com/totolescagot",
		images: [{ nom: "suite_6.jpg" }, { nom: "suite_7.jpg" }, { nom: "suite_8.jpg" }, { nom: "suite_9.jpg" }],
		etablissementId: 1,
	},
	{
		nom: "Nid des amoureux",
		imageMiseEnAvant: "suite_3.jpg",
		prix: 100,
		description: "Une suite que vous n'etes pas pret d'oublier ou pas!",
		UrlBooking: "www.booking.com/totolescagot",
		images: [{ nom: "suite_8.jpg" }, { nom: "suite_9.jpg" }, { nom: "suite_10.jpg" }, { nom: "suite_11.jpg" }],
		etablissementId: 1,
	},
	{
		nom: "Refuge des coquins",
		imageMiseEnAvant: "suite_4.jpg",
		prix: 100,
		description: "Vous ne trouverez pas mieux ailleurs!",
		UrlBooking: "www.booking.com/totolescagot",
		images: [{ nom: "suite_12.jpg" }, { nom: "suite_13.jpg" }, { nom: "suite_14.jpg" }, { nom: "suite_5.jpg" }],
		etablissementId: 1,
	},
	{
		nom: "Cachette des amants",
		imageMiseEnAvant: "suite_5.jpg",
		prix: 500,
		description: "Ne le dites surtout pas à votre mari ou votre femme !",
		UrlBooking: "www.booking.com/totolescagot",
		images: [{ nom: "suite_2.jpg" }, { nom: "suite_10.jpg" }, { nom: "suite_1.jpg" }, { nom: "suite_3.jpg" }],
		etablissementId: 1,
	},
];
const fakeData = { suites: fakeSuites, users: fakeUsers, etablissements: fakeEtablissements, reservations: fakeReservations };
exports.fakeData = fakeData;
