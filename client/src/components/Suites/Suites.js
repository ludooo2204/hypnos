import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Suites.module.css";

const SuiteCard = (suiteData) => {
	let navigate = useNavigate();
	console.log(suiteData);
	const { id, nom, UrlBooking, description, images, etablissementId, imageMiseEnAvant, prix } = suiteData.suiteData;
	const selectionnerSuite = () => {
		console.log("ta choisi " + nom);
			console.log("ta choisi " + nom);
			navigate('../suite',{state:suiteData.suiteData})
	
	};
	return (
		<div className={styles.cardMain} onClick={selectionnerSuite}>
			<img className={styles.photo} src={require("../../uploads/" + imageMiseEnAvant)}></img>
			<h1 className={styles.titreSuite}>{nom} </h1>
		
		</div>
	);
};
const Suites = () => {
	const { state } = useLocation();
	const { id, nom, adresse, description, image, user, ville } = state;


	return (
		<div className={styles.main}>
			<h1 className={styles.titre}>Nos suites romantiques à {ville}</h1>
			<div className={styles.main}>
				{state.suites && state.suites.map((suite, i) => <SuiteCard key={i} suiteData={suite} />)}
				</div>
				<div>
					<ul className={styles.infoEtablissement}>
						<li>{nom}</li>
						<li>{description}</li>
						<li>{adresse}</li>
						<li>
							gerant : {user.nom} {user.prenom}
						</li>
					</ul>
			</div>
		</div>
	);
};

export default Suites;
