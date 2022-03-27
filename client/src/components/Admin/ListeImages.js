import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const ListeImages = ({ images,onDelete }) => {
	const [imagesState, setimagesState] = useState(images);
	useEffect(() => {
		setimagesState(images);
	}, [images]);

	return (
		<div className={styles.ListeImages}>
			{imagesState &&
				imagesState.map((image, i) => {
					return (
						<div key={i} className={styles.imageGroup}>
							<img className={styles.image} src={typeof image=='string'?require("../../uploads/" + image):URL.createObjectURL(image)} />
							<HighlightOffIcon className={styles.iconeDelete} onClick={() => onDelete(i)} />
						</div>
					);
				})}
		</div>
	);
};

export default ListeImages;
