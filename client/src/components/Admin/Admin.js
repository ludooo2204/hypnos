// VOIR POUR RESTREINDRE LA ROUTE ADMIN SELON ACCORD DU BACKEND

import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import imagePresentation from "../../img/1.jpg";
import axios from "axios";
import { matchSorter } from "match-sorter";
import { useNavigate } from "react-router-dom";
import InputImage from "./InputImage";
import ListeImages from "./ListeImages";

const Admin = ({ userData }) => {
	const [etablissements, setEtablissements] = useState(null);
	const [etablissementChoisi, setEtablissementChoisi] = useState(null);
	const [users, setUsers] = useState("");
	const [nom, setNom] = useState("");
	const [adresse, setAdresse] = useState("");
	const [ville, setVille] = useState("");
	const [description, setDescription] = useState("");
	const [userFinded, setUserFinded] = useState(null);
	const [images, setImages] = useState(null);
	const [modalUserFindedVisible, setModalUserFindedVisible] = useState(false);
	const [manager, setManager] = useState("");
	const [managerOrigine, setManagerOrigine] = useState("");

	let navigate = useNavigate();

	useEffect(() => {
		axios
			.get("/admin/getUsers")
			.then((users) => {
				setUsers(users.data);
			})
			.catch((err) => {
				alert("vous n'avez pas les droits d'administrateur!!!");
			});
		axios.get("/admin/etablissement").then((etablissement) => {
			let etablissementsTemp = etablissement.data.etablissement;
			etablissementsTemp.unshift({ nom: "---" });
			setEtablissements(etablissementsTemp);
		});
	}, []);
	useEffect(() => {
		if (etablissementChoisi) {
			if (etablissementChoisi.nom === "---") {
				setNom("");
				setAdresse("");
				setDescription("");
				setVille("");
				setManager({ email: "" });
				setImages(null);
			} else {
				setNom(etablissementChoisi.nom);
				setAdresse(etablissementChoisi.adresse);
				setDescription(etablissementChoisi.description);
				setVille(etablissementChoisi.ville);
				setManager(etablissementChoisi.user);
				setManagerOrigine(etablissementChoisi.user);
				setImages(etablissementChoisi.image);
			}
		}
	}, [etablissementChoisi]);

	const handleChangeEtablissement = (e) => {
		setEtablissementChoisi(etablissements.filter((element) => element.nom == e.target.value)[0]);
	};
	const handleUserSearch = (e) => {
		setManager(e.target.value);
		if (e.target.value == "") {
			setModalUserFindedVisible(false);
		} else {
			const usersOnlyUser = users.users.filter((user) => user.roles.length == 1);
			const resultatDeRecherche = matchSorter(usersOnlyUser, e.target.value, { keys: ["email"] });
			if (resultatDeRecherche.length < 10) {
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

		if (etablissementChoisi) {
			const etablissementData = { nom, adresse, ville, description, manager: manager.id, image: images.name };
			axios
				.patch("/admin/etablissement/" + etablissementChoisi.id, etablissementData, header)
				.then(() => axios.patch("/admin/etablissement/manager/" + etablissementChoisi.id, { userId: manager.id }, header))
				.then(() => {
					console.log("manager.id")
					console.log(manager.id)
					console.log("managerOrigine.id")
					console.log(managerOrigine.id)
					if (manager.id !== managerOrigine.id) axios.get("/admin/userToManager/" + manager.id, header).then(user=>console.log("userTomanager ",user));
				})
				.then(() => {
					if (manager.id !== managerOrigine.id) axios.get("/admin/managerToUser/" + managerOrigine.id, header).then(user=>console.log("managertoUser ",user));
				})
				.then(() => {
					alert("Les modifications ont ??t?? sauvegard??e !");
					navigate("../");
				});
		} else {
			alert("Merci de choisir un ??tablissement ?? modifier !");
		}
	};
	const annulerEtablissement = () => {
		window.location.reload();
	};
	const supprimerEtablissement = () => {
		const header = {
			headers: {
				"x-access-Token": window.localStorage.getItem("token"),
				"content-type": "application/json",
			},
		};
		console.log("supprimerEtablissement");
		if (window.confirm("Etes-vous sur de supprimer l'??tablissement " + etablissementChoisi.nom + " ?")) {
			axios
				.delete("/admin/etablissement/" + etablissementChoisi.id, header)
				.then(() => axios.get("/admin/managerToUser/" + managerOrigine.id, header))
				.then(() => window.location.reload());
		}
	};
	const handleImage = (e) => {
		setImages(e);
	};
	const onDelete = (img) => {
		setImages(null);
	};
	return (
		<div className={styles.main}>
			{modalUserFindedVisible && userFinded.length > 0 && (
				<div className={styles.userFinded}>
					{userFinded &&
						userFinded.map((e, i) => (
							<li key={i} className={styles.userFindedLi} onClick={() => handleSetManager(e)}>
								{e.email}
							</li>
						))}
				</div>
			)}
			{etablissements && (
				<div className={styles.agence}>
					<label> Agence de : </label>
					<select className={styles.selectAgence} value={etablissementChoisi ? etablissementChoisi.nom : "---"} onChange={handleChangeEtablissement}>
						{etablissements.map((x, y) => (
							<option key={y}>{x.nom}</option>
						))}
					</select>
				</div>
			)}
			<div className={styles.inputs}>
				<div className={styles.input}>
					<label>Nommer </label>
					<input type="text" className={`${styles.inputText} ${styles.inputTextManager}`} value={manager.email} onChange={handleUserSearch}></input>
					<label className={styles.inputLabelManager}> en tant que manager </label>
				</div>
				<div className={styles.input}>
					<label>Nom : </label>
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
						Image de pr??sentation <span className={styles.miniText}>(format paysage)</span> :
					</label>
					<div className={styles.ajoutImage}>
						<InputImage Recupererfile={handleImage} />
						<ListeImages images={images} onDelete={onDelete} />
					</div>
				</div>
			</div>
			<div>
				<button className={styles.buttonAjoutEtablissement} onClick={() => navigate("../AjoutEtablissement")}>
					Ajouter un ??tablissement
				</button>
				<button className={styles.buttonSupprimerEtablissement} onClick={supprimerEtablissement}>
					Supprimer un ??tablissement
				</button>
			</div>
			<div className={styles.buttonGroup}>
				<button className={styles.buttonValidation} onClick={validerEtablissement}>
					Valider
				</button>
				<button className={styles.buttonAnnulation} onClick={annulerEtablissement}>
					Annuler
				</button>
			</div>
		</div>
	);
};

export default Admin;
