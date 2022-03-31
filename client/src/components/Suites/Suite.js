import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Suites.module.css";

const Suite = () => {
	const { state } = useLocation();
	console.log("state from suite");
	console.log(state);
	const { id, nom, UrlBooking, description, images, etablissementId, imageMiseEnAvant, prix } = state;

	return (
		<div className={styles.main}>
			<h1>{nom}</h1>
			<div className={styles.cardMain}>{images && images.map((image, i) => <img className={styles.photo} src={require("../../uploads/" + image.nom)}></img>)}</div>
			<div>
				<ul className={styles.infoEtablissement}>
					<li><a href={UrlBooking}>{UrlBooking}</a></li>
					<li>{description}</li>
					<li>{prix} euros</li>
					{/* <li>
						gerant : {user.nom} {user.prenom}
					</li> */}
				</ul>
			</div>
		</div>
	);
};

export default Suite;
