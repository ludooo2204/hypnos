import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Suites.module.css";

const Suite = () => {
	const navigate=useNavigate()
	const { state } = useLocation();
	console.log("state from suite");
	console.log(state);
	const { id, nom, UrlBooking, description, images, etablissementId, imageMiseEnAvant, prix } = state;
const reserverSuite = ()=>{
	navigate('../reservation',{state})
}
	return (
		<div className={styles.mainSuite}>
			<h1 className={styles.titre}>{nom}</h1>
			<div className={styles.suiteCardGroup}>{images && images.map((image, i) => <img className={styles.photoSuite} src={"/uploads/" + image.nom}></img>)}</div>
			{/* <div className={styles.suiteCardGroup}>{images && images.map((image, i) => <img className={styles.photoSuite} src={require("../../uploads/" + image.nom)}></img>)}</div> */}
			<hr width="30%"></hr>
			
			<div className={styles.infoSuite}>
				<ul className={styles.infoEtablissement}>
					<li>{description}</li>
					<li>Tarifs : {prix} euros la nuit</li>
					<li><a href={UrlBooking}>Retrouvez cette suite sur <span className={styles.bookingLien}>Booking.com</span></a></li>
				</ul>
					<button className={styles.buttonReserver} onClick={reserverSuite} >Réserver</button>
			</div>
		</div>
	);
};

export default Suite;
