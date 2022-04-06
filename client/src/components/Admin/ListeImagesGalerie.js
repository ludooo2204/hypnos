import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const ListeImagesGalerie = ({ images, onDelete }) => {
    console.log("image from galerei");
    console.log("image from galerei");
    console.log("image from galerei");
    console.log("image from galerei");
    console.log(images)
	const [imagesState, setimagesState] = useState(images[0]);
	useEffect(() => {
        console.log("coucoucoucou")
		console.log(images);
		let imagesTemp;
		if (typeof images[0] == "object" && images[0].length > 0) {
			console.log(images)
			console.log(images[0])
			console.log(images[0].map((a) => a.nom));
			imagesTemp = images[0].map((a) => a.nom);
            setimagesState(imagesTemp);
		}
        else setimagesState(images);
	}, [images]);
useEffect(() => {
console.log("imagesState")
console.log("imagesState")
console.log("imagesState")
console.log("imagesState")
console.log("imagesState")
console.log(imagesState)
}, [imagesState])

	return (
		<div className={styles.ListeImages}>
			{imagesState &&
				imagesState.map((image, i) => {
					return (
						<div key={i} className={styles.imageGroup}>
							{console.log("image")}
							{console.log(image)}
							{console.log(typeof image)}
							<img className={styles.image} src={typeof image == "string" ? require("../../uploads/" + image) : URL.createObjectURL(image)} />
							<HighlightOffIcon className={styles.iconeDelete} onClick={() => onDelete(i)} />
						</div>
					);
				})}
		</div>
	);
};

export default ListeImagesGalerie;
