import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const ListeImages = ({ images, onDelete }) => {
	const [imagesState, setimagesState] = useState(null);
	useEffect(() => {
		setimagesState(images);
	}, [images]);
	return (
		<div className={styles.ListeImages}>
			{imagesState && (
				<div className={styles.imageGroup}>
					<img className={styles.image} src={typeof imagesState == "string" ? "/uploads/" + imagesState : URL.createObjectURL(imagesState)} />
					<HighlightOffIcon className={styles.iconeDelete} onClick={() => onDelete()} />
				</div>
			)}
		</div>
	);
};

export default ListeImages;
