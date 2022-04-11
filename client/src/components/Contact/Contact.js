import axios from "axios";
import React, { useState } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
	const [sujet, setSujet] = useState(null);
	const [nom, setNom] = useState(null);
	const [prenom, setPrenom] = useState(null);
	const [adresse, setAdresse] = useState(null);
	const [demande, setDemande] = useState(null);
	const handleChangeSujet = (e) => {
		setSujet(e.target.value);
	};
	const handleNom = (e) => {
		setNom(e.target.value);
	};
	const handlePrenom = (e) => {
		setPrenom(e.target.value);
	};
	const handleAdresse = (e) => {
		setAdresse(e.target.value);
	};
	const handleDemande = (e) => {
		setDemande(e.target.value);
	};
	const validerContact = () => {
		const demandeComplete = { sujet, nom, prenom, adresse, demande };
		console.log("validerContact");
		console.log(demandeComplete);
		axios.post("/sendmail", { demandeComplete }).then((e) => {
			if (e.data.status === "ok") {
				alert("votre demande a été transmise. Nous vous répondrons dans nos meilleurs délais.")
                window.location.reload()
			} else {alert("votre demande n'a pas été transmise. Nous vous conseillons de réitérer votre demande plus tard.")}
		});
	};
	const annulerContact = () => {
		setNom("");
		setPrenom("");
		setAdresse("");
		setDemande("");
	};
	return (
		<div className={styles.main}>
			<div className={styles.Sujet}>
				<label className={styles.titre}> Sujet : </label>
				<select className={styles.selectAgence} onChange={handleChangeSujet}>
					<option>---</option>
					<option>Je souhaite poser une réclamation</option>
					<option>Je souhaite commander un service supplémentaire</option>
					<option>Je souhaite en savoir plus sur une suite</option>
					<option>J’ai un souci avec cette application</option>
				</select>
			</div>
			<div className={styles.inputs}>
				<div className={styles.input}>
					<label>Nom : </label>
					<input type="text" className={styles.inputText} placeholder={"votre nom"} value={nom} onChange={handleNom}></input>
				</div>
				<div className={styles.input}>
					<label>Prénom : </label>
					<input type="text" className={styles.inputText} placeholder={"votre prénom"} value={prenom} onChange={handlePrenom}></input>
				</div>
				<div className={styles.input}>
					<label>Adresse Email: </label>
					<input className={styles.inputText} type="email" placeholder={"votre adresse email"} value={adresse} onChange={handleAdresse}></input>
				</div>

				<div className={styles.input}>
					<label>Votre demande : </label>
					<textarea rows={10} className={styles.inputTextArea} value={demande} onChange={handleDemande}></textarea>
				</div>
			</div>
			<div className={styles.buttonGroup}>
				<button className={styles.buttonReserver} onClick={validerContact}>
					Valider
				</button>
				<button className={styles.buttonAnnulation} onClick={annulerContact}>
					Annuler
				</button>
			</div>
		</div>
	);
};

export default Contact;
