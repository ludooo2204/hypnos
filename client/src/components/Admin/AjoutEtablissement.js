// VOIR POUR RESTREINDRE LA ROUTE ADMIN SELON ACCORD DU BACKEND

import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import imagePresentation from "../../img/1.jpg";
import axios from "axios";
import { matchSorter } from "match-sorter";
import { useNavigate } from "react-router-dom";
import InputImage from "./InputImage";
import ListeImages from "./ListeImages";

const Admin = () => {
	const [users, setUsers] = useState("");
	const [nom, setNom] = useState("");
	const [adresse, setAdresse] = useState("");
	const [ville, setVille] = useState("");
	const [description, setDescription] = useState("");
	const [userFinded, setUserFinded] = useState(null);
	const [images, setImages] = useState(null);

	const [modalUserFindedVisible, setModalUserFindedVisible] = useState(false);
	const [manager, setManager] = useState("");
	let navigate = useNavigate();
	useEffect(() => {
		axios.get("/admin/getUsers").then((users) => {
			console.log(users.data);
			setUsers(users.data);
		});
		axios.get("/admin/etablissement").then((etablissement) => {
			console.log(etablissement);
			console.log(etablissement.data);
		});
	}, []);

	const handleChangeEtablissement = () => {
		console.log("select");
	};
	const handleUserSearch = (e) => {
		setManager(e.target.value);
		if (e.target.value == "") {
			setModalUserFindedVisible(false);
		} else {
			console.log("users");
			console.log(users.users);
			const resultatDeRecherche = matchSorter(
				users.users,
				// users.users.map((user) => user.email),
				e.target.value,
				{ keys: ["email"] }
			);
			if (resultatDeRecherche.length < 10) {
				console.log("resultats");
				console.log(resultatDeRecherche);
				setModalUserFindedVisible(true);
				setUserFinded(resultatDeRecherche);
			}
		}
	};
	const handleNom = (e) => {
		setNom(e.target.value);
	};
	const handleAdresse = (e) => {
		setAdresse(e.target.value);
	};
	const handleVille = (e) => {
		setVille(e.target.value);
	};
	const handleDescription = (e) => {
		setDescription(e.target.value);
	};
	const handleSetManager = (e) => {
		console.log(e);
		setModalUserFindedVisible(false);
		setManager(e);
	};
	const validerEtablissement = () => {
		const header = {
			headers: {
				"x-access-Token": window.localStorage.getItem("token"),
				"content-type": "application/json",
			},
		};
		const etablissementData = { nom, adresse, ville, description, manager: manager.id, images:images.name };
	console.log("images")
	console.log("images")
	console.log("images")
	console.log("images")
	console.log("images")
	console.log("images")
	console.log(images)
	
		axios.post("/admin/etablissement", etablissementData,header)
		.then(() => axios.patch("/admin/userToManager/" + manager.id,header))
		.then(navigate("../"));
	};
	const annulerEtablissement = () => {
		console.log("annulerEtablissement");
		window.location.reload()

	};
	const handleImage = (e) => {
	
		setImages(e);

	};
	const onDelete = (img) => {
		setImages(null);
		// console.log(images);
		// const copie = [...images];
		// copie.splice(img, 1);
		// setImages(copie);
	};
	return (
		<div className={styles.mainAjout}>
			<h1 className={styles.titre}>Création d'un nouvel établissement</h1>
			{modalUserFindedVisible && userFinded.length > 0 && (
				<div className={styles.userFinded}>
					{userFinded &&
						userFinded.map((e, i) => (
							<li key={i} onClick={() => handleSetManager(e)}>
								{e.email}
							</li>
						))}
				</div>
			)}
			<div className={styles.inputs}>
				<div className={styles.input}>
					<label>Nommer </label>
					<input type="text" className={`${styles.inputText} ${styles.inputTextManager}`} value={manager.email} onChange={handleUserSearch}></input>
					<label className={styles.inputLabelManager}> en tant que manager </label>
				</div>
				<div className={styles.input}>
					<label>Nom de l'établissement : </label>
					<input type="text" className={styles.inputText} value={nom} onChange={handleNom}></input>
				</div>
				<div className={styles.input}>
					<label>Adresse : </label>
					<input type="text" className={styles.inputText} value={adresse} onChange={handleAdresse}></input>
				</div>
				<div className={styles.input}>
					<label>Ville : </label>
					<input type="text" className={styles.inputText} value={ville} onChange={handleVille}></input>
				</div>
				<div className={styles.input}>
					<label>Description : </label>
					<textarea rows={5} className={styles.inputTextArea} value={description} onChange={handleDescription}></textarea>
				</div>
				<div className={styles.inputImage}>
					<label className={styles.labelPresentation}>
						Image de présentation <span className={styles.miniText}>(format paysage)</span> :
					</label>
					<div className={styles.ajoutImage}>
						<InputImage Recupererfile={handleImage} />
						<ListeImages images={images} onDelete={onDelete} />
					</div>
				</div>
			</div>
			<div className={styles.buttonGroup}>
				<button className={styles.buttonValidation} onClick={validerEtablissement}>
					Valider
				</button>
				<button className={styles.buttonAnnulation} onClick={annulerEtablissement}>
					Annuler
				</button>
			</div>
			<div>
				<button className={styles.buttonAjoutEtablissement} onClick={() => navigate("../Admin")}>
					Modifier un établissement
				</button>
			</div>
		</div>
	);
};

export default Admin;
