import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./AjoutCreation.module.css";

const FileUploader = ({  onFileSelectError, onFileSelectSuccess }) => {

	const handleFileInput = (e) => {
		// handle validations
		const file = e.target.files[0];
console.log(file.size)
		if (file.size > 10000024) onFileSelectError({ error: "File size cannot exceed more than 10MB" });
		else onFileSelectSuccess(file);
	};

	return (
		<div className="file-uploader">
			<input type="file" name="file" id="file" className={styles.inputFile} onChange={handleFileInput} />
			<label htmlFor="file">Ajouter une image</label>
		</div>
	);
};

const InputImageMiseEnAvant = ({ Recupererfile }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	useEffect(() => {
	 if (selectedFile) submitForm()}
	, [selectedFile])
	
	const submitForm = () => {
		const formData = new FormData();
		// console.log(selectedFile)
		formData.append("file", selectedFile);
		// console.log("selectedFileé");
		console.log(selectedFile);
		console.log("formData")
		console.log(formData)
		console.log('URL.createObjectURL(selectedFile)');
		console.log(URL.createObjectURL(selectedFile));
		axios
			.post("/manager/postImage", formData)
			.then((res) => {
				console.log("image Uploaded")
				console.log(res)
				Recupererfile(selectedFile)
			})
			.catch((err) => alert("File Upload Error"));
		// Recupererfile(selectedFile);
	};
	const handleSelect = (file) => {

		setSelectedFile(file);
	};
	return (
		<div className="App">
			<form>
				<FileUploader
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
export default InputImageMiseEnAvant;
