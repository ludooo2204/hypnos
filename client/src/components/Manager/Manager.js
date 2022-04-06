// VOIR POUR RESTREINDRE LA ROUTE ADMIN SELON ACCORD DU BACKEND

import React, { useEffect, useState } from "react";
import styles from "./Manager.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputImage from "../Admin/InputImage";
import InputImageGalerie from "../Admin/InputImageGalerie";
import ListeImages from "../Admin/ListeImages";
import ListeImagesGalerie from "../Admin/ListeImagesGalerie";

const Manager = () => {
	const [suites, setSuites] = useState(null);
	const [suiteChoisi, setSuiteChoisi] = useState(null);
	const [nom, setNom] = useState("");
	const [lien, setLien] = useState("");
	const [prix, setPrix] = useState("");
	const [description, setDescription] = useState("");
	const [imageMiseEnAvant, setImageMiseEnAvant] = useState([]);
	const [images, setImages] = useState([]);

	let navigate = useNavigate();
	useEffect(() => {
		axios.get("/manager/suite").then((suite) => {
			console.log(suite.data.suite);
			let suitesTemp = suite.data.suite;
			suitesTemp.unshift({ nom: "---" });
			setSuites(suitesTemp);
		});
	}, []);
	useEffect(() => {
	console.log("images from useeffecet")
	console.log("images from useeffecet")
	console.log("images from useeffecet")
	console.log(images)
	}, [images]);
	useEffect(() => {
		if (suiteChoisi) {
			console.log("suite choisie !!");
			console.log(suiteChoisi);

			if (suiteChoisi.nom === "---") {
				setNom("");
				setPrix(0);
				setDescription("");
				setLien("");
				setImages([]);
				setImageMiseEnAvant([]);
			} else {
				console.log("SuiteChoisi");
				console.log("SuiteChoisi");
				console.log("SuiteChoisi");
				console.log(suiteChoisi);
				setNom(suiteChoisi.nom);
				setPrix(suiteChoisi.prix);
				setDescription(suiteChoisi.description);
				setLien(suiteChoisi.lien);
				setImages([suiteChoisi.images]);
				setImageMiseEnAvant([suiteChoisi.imageMiseEnAvant]);
			}
		}
	}, [suiteChoisi]);

	const handleChangeSuite = (e) => {
		console.log(suites);
		console.log(e.target.value);
		console.log(suites.filter((element) => element.nom == e.target.value)[0]);
		setSuiteChoisi(suites.filter((element) => element.nom == e.target.value)[0]);
	};

	const handleNom = (e) => {
		setNom(e.target.value);
	};
	const handlePrix = (e) => {
		setPrix(e.target.value);
	};
	const handleLien = (e) => {
		setLien(e.target.value);
	};
	const handleDescription = (e) => {
		setDescription(e.target.value);
	};

	const validerSuite = () => {
		console.log("Suite from update");
		console.log(suiteChoisi);
		if (suiteChoisi) {
			const suiteData = { nom, prix, lien, description, images: images.map((image) => (image.name ? image.name : image)) };
			console.log("validerSuite");
			console.log(suiteData);
			axios.patch("/manager/suite/" + suiteChoisi.id, suiteData);
			// .then(() => axios.patch("/admin/etablissement/manager/" + suiteChoisi.id, { userId: manager.id }))
		} else {
			alert("Merci de choisir un établissement à modifier !");
		}
	};
	const annulerSuite = () => {
		console.log("annulerSuite");
	};
	const supprimerSuite = () => {
		console.log("supprimerSuite");
		if (window.confirm("Etes-vous sur de supprimer l'établissement " + suiteChoisi.nom + " ?")) {
			axios.delete("/manager/suide/" + suiteChoisi.id).then(() => window.location.reload());
		}
	};
	const handleImageMiseEnAvant = (e) => {
		console.log("e handleImageMiseEnAvant")
		console.log(e)
		// setImages((images) => [...images, e]);
		// setImageMiseEnAvant([e]);
		// setImageMiseEnAvant([e.name]);
		setImageMiseEnAvant([e.name]);
	};
	const handleImageGalerie = (e) => {
		console.log("e handleImageGalerie")
		console.log("e handleImageGalerie")
		console.log(e.name)
		console.log(images)
		let temp = []
		temp=[...images]
		console.log("temp")
		console.log(temp)
		temp[0].push({nom:e.name})
		console.log("temp")
		console.log(temp)
		setImages(temp)
		// setImages((images) => [...images[0], {nom:e.name}]);
		// setImages([e]);
	};
	const onDelete = (img) => {
		console.log(img);
		const copie = [...imageMiseEnAvant];
		copie.splice(img, 1);
		setImageMiseEnAvant(copie);
	};
	const onDeleteGalerie = (img) => {
		console.log(images);
		console.log(img);
		const copie = [...images];
		console.log("copie")
		console.log(copie)
		copie[0].splice(img, 1);
		setImages(copie);
	};
	return (
		<div className={styles.main}>
			{suites && (
				<div className={styles.agence}>
					<label> Suite à modifier : </label>
					<select className={styles.selectAgence} value={suiteChoisi ? suiteChoisi.nom : "---"} onChange={handleChangeSuite}>
						{suites.map((x, y) => (
							<option key={y}>{x.nom}</option>
						))}
					</select>
				</div>
			)}
			<div className={styles.inputs}>
				<div className={styles.input}>
					<label>Nom : </label>
					<input type="text" className={styles.inputText} value={nom} onChange={handleNom}></input>
				</div>
				<div className={styles.input}>
					<label>Prix : </label>
					<input type="number" className={styles.inputText} value={prix} onChange={handlePrix}></input>
				</div>
				<div className={styles.input}>
					<label>Lien Booking.com : </label>
					<input type="text" className={styles.inputText} value={lien} onChange={handleLien}></input>
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
						<InputImage Recupererfile={handleImageMiseEnAvant} />
						<ListeImages images={imageMiseEnAvant} onDelete={onDelete} />
					</div>
				</div>
				<div className={styles.inputImage}>
					<label className={styles.labelPresentation}>
						Images de galerie <span className={styles.miniText}>(format paysage)</span> :
					</label>
					<div className={styles.ajoutImage}>
						<InputImageGalerie RecupererfileGalerie={handleImageGalerie} />
						<ListeImagesGalerie images={images} onDelete={onDeleteGalerie} />
					</div>
				</div>
			</div>
			<div className={styles.buttonGroup}>
				<button className={styles.buttonValidation} onClick={validerSuite}>
					Valider
				</button>
				<button className={styles.buttonAnnulation} onClick={annulerSuite}>
					Annuler
				</button>
			</div>
			<div>
				<button className={styles.buttonAjoutEtablissement} onClick={() => navigate("../AjoutSuite")}>
					Ajouter une suite
				</button>
				<button className={styles.buttonSupprimerEtablissement} onClick={supprimerSuite}>
					Supprimer une suite
				</button>
			</div>
		</div>
	);
};

export default Manager;
