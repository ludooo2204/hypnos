// VOIR POUR RESTREINDRE LA ROUTE ADMIN SELON ACCORD DU BACKEND

import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import imagePresentation from "../../img/1.jpg";
import axios from "axios";
import { matchSorter } from "match-sorter";
import { useNavigate } from "react-router-dom";

const Admin = () => {
	const [users, setUsers] = useState(null);
	const [userFinded, setUserFinded] = useState(null);
	const [modalUserFindedVisible, setModalUserFindedVisible] = useState(false);
	const [inputValue, setInputValue] = useState(null);
	let navigate = useNavigate();
	useEffect(() => {
		axios.get("/admin/getUsers").then((users) => {
			console.log(users.data);
			setUsers(users.data);
		});
	}, []);

	const handleChangeEtablissement = () => {
		console.log("select");
	};
	const handleUserSearch = (e) => {
		setInputValue(e.target.value);
		if ((e.target.value == "")) {
			setModalUserFindedVisible(false);
		} else {
			console.log(users.users);
			const resultatDeRecherche = matchSorter(
				users.users.map((user) => user.email),
				e.target.value
			);
			if (resultatDeRecherche.length < 10) {
				setModalUserFindedVisible(true);
				setUserFinded(resultatDeRecherche);
			}
		}
	};
	const handleSetManager = (e) => {
		console.log(e);
		setModalUserFindedVisible(false);
		setInputValue(e);
	};
	const ajouterImage = () => {
		console.log("ajouter image");
	};
	const validerEtablissement = () => {
		console.log("validerEtablissement");
	};
	const annulerEtablissement = () => {
		console.log("annulerEtablissement");
	};
	return (
		<div className={styles.main}>
			{modalUserFindedVisible && userFinded.length > 0 && <div className={styles.userFinded}>{userFinded && userFinded.map((e) => <li className={styles.userFindedLi} onClick={() => handleSetManager(e)}>{e}</li>)}</div>}
			<div className={styles.agence}>
				<label> Agence de : </label>
				<select className={styles.selectAgence} value={"nada"} onChange={handleChangeEtablissement}>
					<option value="grapefruit">Pamplemousse</option>
					<option value="lime">Citron vert</option>
					<option value="coconut">Noix de coco</option>
					<option value="mango">Mangue</option>
				</select>
			</div>
			<div className={styles.inputs}>
				<div className={styles.input}>
					<label>Nommer </label>
					<input type="text" className={`${styles.inputText} ${styles.inputTextManager}`} value={inputValue} onChange={handleUserSearch}></input>
					<label className={styles.inputLabelManager}> en tant que manager </label>
				</div>
				<div className={styles.input}>
					<label>Modifier Nom : </label>
					<input type="text" className={styles.inputText}></input>
				</div>
				<div className={styles.input}>
					<label>Modifier adresse : </label>
					<input type="text" className={styles.inputText}></input>
				</div>
				<div className={styles.input}>
					<label>Modifier ville : </label>
					<input type="text" className={styles.inputText}></input>
				</div>
				<div className={styles.input}>
					<label>Modifier la description : </label>
					<textarea rows={5} className={styles.inputTextArea}></textarea>
				</div>
				<div className={styles.inputImage}>
					<label className={styles.labelPresentation}>
						Modifier l'image de présentation <span className={styles.miniText}>(format paysage)</span> :
					</label>
					<div className={styles.ajoutImage}>
						<button className={styles.button} onClick={ajouterImage}>
							ajouter une image
						</button>
						{true ? <img src={imagePresentation}></img> : null}
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
				<button className={styles.buttonAjoutEtablissement} onClick={() => navigate("../AjoutEtablissement")}>
					Ajouter un établissment
				</button>
				<button className={styles.buttonSupprimerEtablissement} onClick={ajouterImage}>
					Supprimer un établissment
				</button>
			</div>
		</div>
	);
};

export default Admin;
