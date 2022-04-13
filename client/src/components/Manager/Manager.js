// VOIR POUR RESTREINDRE LA ROUTE ADMIN SELON ACCORD DU BACKEND

import React, { useEffect, useState } from "react";
import styles from "./Manager.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputImageMiseEnAvant from "../Admin/InputImageMiseEnAvant";
import InputImageGalerie from "../Admin/InputImageGalerie";
import ListeImagesMiseEnAvant from "../Admin/ListeImagesMiseEnAvant";
import ListeImagesGalerie from "../Admin/ListeImagesGalerie";

const Manager = ({ user }) => {
	const [suites, setSuites] = useState(null);
	const [suiteChoisi, setSuiteChoisi] = useState(null);
	const [nom, setNom] = useState("");
	const [lien, setLien] = useState("");
	const [prix, setPrix] = useState("");
	const [description, setDescription] = useState("");
	const [imageMiseEnAvant, setImageMiseEnAvant] = useState(null);
	const [images, setImages] = useState([]);

	let navigate = useNavigate();
	useEffect(() => {
		axios.get("user/etablissements").then((etablissements) => {
			if (user) {
				if (etablissements.data.etablissement.filter((e) => e.user.id == user.id)[0].suites.length != 0) {
					let suitesTemp = etablissements.data.etablissement.filter((e) => e.user.id == user.id)[0].suites;
					suitesTemp.unshift({ nom: "---" });
					setSuites(suitesTemp);
				} else {
					alert("Attention, aucune suite n'a encore été créé. Merci d'en ajouter une");
					setSuites([{ nom: "---" }]);
				}
			}
		})
		
	}, [user]);


	useEffect(() => {
		if (suiteChoisi) {

			console.log("suiteChoisi")
			console.log(suiteChoisi)
			console.log("suiteChoisi.images")
			console.log("suiteChoisi.images")
			console.log("suiteChoisi.images")
			console.log("suiteChoisi.images")
			console.log(suiteChoisi.images)
			if (suiteChoisi.nom === "---") {
				setNom("");
				setPrix(0);
				setDescription("");
				setLien("");
				setImages(null);
				setImageMiseEnAvant(null);
			} else {
				setNom(suiteChoisi.nom);
				setPrix(suiteChoisi.prix);
				setDescription(suiteChoisi.description);
				setLien(suiteChoisi.lien);
				setImages(suiteChoisi.images);
				setImageMiseEnAvant(suiteChoisi.imageMiseEnAvant);
			}
		}
	}, [suiteChoisi]);

	const handleChangeSuite = (e) => {
		console.log("suites")
		console.log("suites")
		console.log("suites")
		console.log("suites")
		console.log("suites")
		console.log(suites)
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
		if (suiteChoisi) {
			 const imagesToSave=images.map((image)=> image.nom?image.nom:image.name)
			 console.log("imagesToSave")
			 console.log(imagesToSave)
			 console.log("imageMiseEnAvant")
			 console.log("imageMiseEnAvant")
			 console.log("imageMiseEnAvant")
			 console.log("imageMiseEnAvant")
			 console.log(imageMiseEnAvant)
			const suiteData = { nom, prix, lien, description,imageMiseEnAvant:imageMiseEnAvant.name, images: imagesToSave };
			console.log("suiteData")
			console.log(JSON.stringify(suiteData,null,2))
			axios.patch("/manager/suite/" + suiteChoisi.id, suiteData).then((e) => {
				if (e.data.status === "ok") {
					alert("la suite à été modifiée");
					window.location.reload()
				}
			}).catch((err) => {
				console.log("errreur!!!!");
				alert("vous n'avez pas les droits de Manager!!!")
			});
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
			axios.delete("/manager/suite/" + suiteChoisi.id).then(() => window.location.reload())
			.catch((err) => {
				console.log("errreur!!!!");
				alert("vous n'avez pas les droits de Manager!!!")
			});
		}
	};
	const handleImageMiseEnAvant = (e) => {
		console.log("e")
		console.log("e")
		console.log("e")
		console.log("e")
		console.log("e")
		console.log(e)
		setImageMiseEnAvant(e);
	};
	const handleImageGalerie = (e) => {

		setImages((images) => [...images, e]);
	};
	const onDelete = (img) => {
		
		setImageMiseEnAvant(null);
	};
	const onDeleteGalerie = (img) => {
		console.log(img)
		const copie = [...images];
		copie.splice(img, 1);
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
						<InputImageMiseEnAvant Recupererfile={handleImageMiseEnAvant} />
						<ListeImagesMiseEnAvant images={imageMiseEnAvant} onDelete={onDelete} />
					</div>
				</div>
				<div className={styles.inputImage}>
					<label className={styles.labelPresentation}>
						Images de galerie <span className={styles.miniText}>(format paysage)</span> :
					</label>
					<div className={styles.ajoutImageGalerie}>
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
