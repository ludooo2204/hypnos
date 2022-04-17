import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const ListeImagesGalerie = ({ images, onDelete }) => {
	const [imagesState, setimagesState] = useState(images);
	useEffect(() => {
		setimagesState(images);
	}, [images]);

	useEffect(() => {}, [imagesState]);
	return (
		<div className={styles.ListeImagesGalerie}>
			{imagesState &&
				imagesState.map((image, i) => {
					return (
						<div key={i} className={styles.imageGroup}>
							<img className={styles.image} src={typeof image.nom == "string" ? "/uploads/" + image.nom : URL.createObjectURL(image)} />
							<HighlightOffIcon className={styles.iconeDelete} onClick={() => onDelete(i)} />
						</div>
					);
				})}
		</div>
	);
};

export default ListeImagesGalerie;
