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
	{
		nom: "Nada",
		prenom: "rafa",
		email: "rafa@gmail.com",
	},
	{
		nom: "pistache",
		prenom: "toto",
		email: "pistaoche@gmail.com",
	},
	{
		nom: "Cruise",
		prenom: "Tom",
		email: "tomcruise@gmail.com",
	},
	{
		nom: "aaa",
		prenom: "a",
		email: "aaaa",
	},
];
const fakeChatellerault=	{
	nom: "Hotel de Chatellerault",
	description: "bel hotel",
	adresse: "47 impasse marcel 86100 chatellerault",
	ville: "chatellerault",
	image: "min_etablissement_1.jpg",
	userId: 2,
	user:{
		nom: "vachon",
		prenom: "ludo",
		email: "ludo",
	},
}
const fakeEtablissements = [

	{
		nom: "Hotel de Poitiers",
		description: "bel hotel",
		adresse: "47 impasse marcel 86100 poitiers",
		ville: "poitiers",
		image: "min_etablissement_2.jpg",

		userId: 3,
	},
	{
		nom: "Hotel de Paris",
		description: "hotel bof",
		adresse: "47 imp paris",
		ville: "paris",
		image: "min_etablissement_3.jpg",

		userId: 4,
	},
	{
		nom: "Hotel de Grenoble",
		description: "miteux hotel",
		adresse: "47 impasse marcel 86100 grenoble",
		ville: "Grenoble",
		image: "min_etablissement_4.jpg",

		userId: 5,
	},
	{
		nom: "Hotel d'Angouleme",
		description: "L'hotel date du 16eme siecle !",
		adresse: "47 impasse marcel 86100 Angouleme",
		ville: "Angouleme",
		image: "min_etablissement_5.jpg",
		userId: 6,
	},
	{
		nom: "Hotel de Nice",
		description: "bel hotel",
		adresse: "47 impasse marcel 65004 Nice",
		ville: "Nice",
		image: "min_etablissement_6.jpg",

		userId: 7,
	},
	{
		nom: "Hotel de Strasbourg",
		description: "hotel miteux",
		adresse: "47 imp Strasbourg",
		ville: "Strasbourg",
		image: "min_etablissement_2.jpg",

		userId: 8,
	},
	{
		nom: "Hotel de Lille",
		description: "Le plus beau des hotel",
		adresse: "47 impasse des chtis 86100 Lille",
		ville: "Lille",
		image: "min_etablissement_2.jpg",

		userId: 9,
	},
];
const fakeReservations = [
	{
		dateDebut: new Date("04/01/2022 12:00:00"),
		dateFin: new Date("04/05/2022 12:00:00"),
		userId: 11,
		suiteId: 1,
	},
	{
		dateDebut: new Date("04/08/2022 12:00:00"),
		dateFin: new Date("04/12/2022 12:00:00"),
		userId: 11,
		suiteId: 1,
	},
	{
		dateDebut: new Date("04/17/2022 12:00:00"),
		dateFin: new Date("04/28/2022 12:00:00"),
		userId: 11,
		suiteId: 1,
	},
	{
		dateDebut: new Date("02/03/2021 12:00:00"),
		dateFin: new Date("02/05/2021 12:00:00"),
		userId: 11	,
		suiteId: 2,
	},
	{
		dateDebut: new Date("01/07/2021 12:00:00"),
		dateFin: new Date("01/13/2021 12:00:00"),
		userId: 3,
		suiteId: 2,
	},
	{
		dateDebut: new Date("02/03/2021 12:00:00"),
		dateFin: new Date("02/06/2021 12:00:00"),
		userId: 4,
		suiteId: 2,
	}
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
		images: [{ nom: "suite_12.jpg" }, { nom: "suite_2.jpg" }, { nom: "suite_8.jpg" }, { nom: "suite_5.jpg" }],
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
const fakeData = { suites: fakeSuites, users: fakeUsers, etablissements: fakeEtablissements, reservations: fakeReservations, fakeChatellerault };
exports.fakeData = fakeData;
