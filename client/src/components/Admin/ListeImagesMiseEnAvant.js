import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const ListeImagesMiseEnAvant = ({ images, onDelete }) => {
	const [imagesState, setimagesState] = useState(null);
	useEffect(() => {
		setimagesState(images);
	}, [images]);
	return (
		<div className={styles.ListeImages}>
			{imagesState &&
				
						<div  className={styles.imageGroup}>
                            {console.log("imagesState")    }
                            {console.log(imagesState)    }
                            {console.log(imagesState)    }
							<img className={styles.image} src={typeof imagesState == "string" ? "/uploads/" + imagesState : URL.createObjectURL(imagesState)} />
							{/* <img className={styles.image} src={typeof imagesState == "string" ? require("../../uploads/" + imagesState) : URL.createObjectURL(imagesState)} /> */}
							<HighlightOffIcon className={styles.iconeDelete} onClick={() => onDelete()} />
						</div>
					
				}
			{/* {imagesState &&
				imagesState.map((image, i) => {
					return (
						<div key={i} className={styles.imageGroup}>
							<img className={styles.image} src={typeof image == "string" ? require("../../uploads/" + image) : URL.createObjectURL(image)} />
							<HighlightOffIcon className={styles.iconeDelete} onClick={() => onDelete(i)} />
						</div>
					);
				})} */}
		</div>
	);
};

export default ListeImagesMiseEnAvant;
