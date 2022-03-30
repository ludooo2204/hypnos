import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Etablissements.module.css";

const EtablissementCard = (etablissementData) => {
	console.log("coucou from Card");
const {id,nom,adresse,description,image,user,ville}=etablissementData.etablissementData
const selectionnerEtablissement=()=>{
    console.log("ta choisi "+ nom)
}
	return (
		<div onClick={selectionnerEtablissement} >
            <h1>{nom}</h1>
			<img src={require("../../uploads/" + image)}></img>
            <label>{description}</label>
            <label>{adresse}</label>
            <label>{ville}</label>
            <label>Contact : {user.nom+" - "+user.prenom}</label>
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
   

	return (
		<>
			{etablissements &&
				etablissements.map(
					(etablissement, i) => 
				<EtablissementCard key={i} etablissementData={etablissement} /> 
                       
				)}
		</>
	);
};

export default Etablissements;
