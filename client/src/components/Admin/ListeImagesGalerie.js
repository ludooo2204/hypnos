import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const ListeImagesGalerie = ({ images, onDelete }) => {

	const [imagesState, setimagesState] = useState(images[0]);
	alert("problem sur image quand reste 0")
	useEffect(() => {
		let imagesTemp;
		console.log("images")
		console.log("images")
		console.log("images")
		console.log("images")
		console.log("images")
		console.log(images)
		console.log(typeof images[0])

		// console.log(images[0].length > 0)
		if (typeof images[0] == "object" && images[0].length > 0) {
		// if (typeof images[0] == "object" && images[0].length > 0) {
			imagesTemp = images[0].map((a) => a.nom);
            setimagesState(imagesTemp);
		}
        else setimagesState(images);
	}, [images]);


	return (
		<div className={styles.ListeImagesGalerie}>
		{	console.log("imagesState")}
		{	console.log("imagesState")}
		{	console.log("imagesState")}
		{	console.log(imagesState)}
			{imagesState && 
				imagesState.map((image, i) => {
					return (
						<div key={i} className={styles.imageGroup}>
						{console.log(typeof image)}
						{console.log(image)}
							<img className={styles.image} src={typeof image == "string" ? require("../../uploads/" + image) :(image.length==0?null: URL.createObjectURL(image))} />
							<HighlightOffIcon className={styles.iconeDelete} onClick={() => onDelete(i)} />
						</div>
					);
				})}
		</div>
	);
};

export default ListeImagesGalerie;
