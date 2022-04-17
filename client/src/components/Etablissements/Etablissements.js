import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Etablissements.module.css";

const EtablissementCard = (etablissementData) => {
	console.log("coucou from Card");
	let navigate = useNavigate();

	const {  nom,  image } = etablissementData.etablissementData;
	const selectionnerEtablissement = () => {
		console.log("ta choisi " + nom);
		navigate("../suites", { state: etablissementData.etablissementData });
	};
	return (
		<div className={styles.cardMain} onClick={selectionnerEtablissement}>
			<img className={styles.photo} src={"/uploads/" + image}></img>
			<h1 className={styles.titre}>{nom} </h1>
		</div>
	);
};
const Etablissements = () => {
	const [etablissements, setEtablissements] = useState(null);
	useEffect(() => {
		axios.get("user/etablissements").then((data) => {
			console.log("etablissements from Etablissements");
			console.log(data.data.etablissement);
			setEtablissements(data.data.etablissement);
		});
	}, []);

	return <div className={styles.main}>{etablissements && etablissements.map((etablissement, i) => <EtablissementCard key={i} etablissementData={etablissement} />)}</div>;
};

export default Etablissements;
