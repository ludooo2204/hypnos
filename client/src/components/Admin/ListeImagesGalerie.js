import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const ListeImagesGalerie = ({ images, onDelete }) => {

	const [imagesState, setimagesState] = useState(images);
	useEffect(() => {
		setimagesState(images);
	}, [images]);
	// useEffect(() => {

	// 	useEffect(() => {
	// 	setimagesState(images);
	// }, [images]);
	// 	let imagesTemp;
	// 	console.log("images");
	// 	console.log("images");
	// 	console.log("images");
	// 	console.log("images");
	// 	console.log("images");
	// 	console.log(images);
	// 	console.log(images[0] && !images[0].length > 0);
	// 	// console.log(typeof images[0]);

	// 	// console.log(images[0].length > 0)
	// 	if (typeof images[0] == "object" && images[0].length > 0) {
	// 		console.log("uno");
	// 		// if (typeof images[0] == "object" && images[0].length > 0) {
	// 		imagesTemp = images[0].map((a) => a.nom);
	// 		setimagesState(imagesTemp);
	// 	} else if (images[0] && !images[0].length > 0) {
			
	// 		console.log("deuxio");
	// 		setimagesState([]);
	// 	}
	// 	// } else if (images[0] && !images[0].length > 0) setimagesState(images)
	// }, [images]);

	useEffect(() => {
		console.log("imagesState");
		console.log("imagesState");
		console.log("imagesState");
		console.log("imagesState");
		console.log(imagesState);
	}, [imagesState]);
	return (
		<div className={styles.ListeImagesGalerie}>
			{/* {	console.log("imagesState")}
		{	console.log("imagesState")}
		{	console.log("imagesState")}
		{	console.log(imagesState)} */}
			{imagesState &&
				imagesState.map((image, i) => {
					return (
						<div key={i} className={styles.imageGroup}>
							{console.log("imagesState")}
							{console.log(imagesState)}
							{console.log(typeof image)}
							{console.log(image)}
							{/* <img className={styles.image} src={require("../../uploads/" + image)} /> */}
							{/* CA CA MARCHE POUR L'UPLOAD */}
							<img className={styles.image} src={typeof image.nom == "string" ? require("../../uploads/" + image.nom) : URL.createObjectURL(image)} />
							{/* <img className={styles.image} src={typeof image == "string" ? require("../../uploads/" + image) :(image.length==0?null: URL.createObjectURL(image))} /> */}
							<HighlightOffIcon className={styles.iconeDelete} onClick={() => onDelete(i)} />
						</div>
					);
				})}
		</div>
	);
};

export default ListeImagesGalerie;
