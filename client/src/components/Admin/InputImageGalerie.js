import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./AjoutCreation.module.css";

const FileUploader2 = ({ onFileSelectError, onFileSelectSuccess }) => {
	const handleFileInput2 = (e) => {
		// handle validations
		const file = e.target.files[0];
		if (file.size > 10000024) onFileSelectError({ error: "File size cannot exceed more than 10MB" });
		else onFileSelectSuccess(file);
	};

	return (
		<div className="file-uploader">
			<input type="file" name="file2" id="file2" className={styles.inputFile} onChange={handleFileInput2} />
			<label htmlFor="file2">Ajouter une image de galerie</label>
		</div>
	);
};

const InputImageGalerie = ({ RecupererfileGalerie }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	useEffect(() => {
		if (selectedFile) submitForm();
	}, [selectedFile]);
	const submitForm = () => {
		const formData = new FormData();
		// console.log(selectedFile)
		formData.append("file", selectedFile);

		axios
			.post("/admin/etablissement/postImage", formData)
			.then((res) => {
				console.log("image Uploaded");
			})
			.catch((err) => alert("File Upload Error"));
		RecupererfileGalerie(selectedFile);
	};
	const handleSelect = (file) => {
		setSelectedFile(file);
	};
	return (
		<div className="App">
			<form>
				<FileUploader2
					onFileSelectSuccess={(file) => {
						handleSelect(file);
					}}
					onFileSelectError={({ error }) => alert(error)}
				/>
				<br />
			</form>
		</div>
	);
};
export default InputImageGalerie;
