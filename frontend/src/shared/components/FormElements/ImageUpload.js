import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

import inputStyles from "./Input.module.css";
import styles from "./ImageUpload.module.css";

const ImageUpload = props => {
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(false);
	const filePickerRef = useRef();

	useEffect(() => {
		if (!file) return;
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	const pickedHandler = event => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			fileIsValid = true;
		} else fileIsValid = false;
		setIsValid(fileIsValid);
		props.onInput(props.id, pickedFile, fileIsValid);
	};

	return (
		<div className={inputStyles["form-control"]}>
			<input
				ref={filePickerRef}
				id={props.id}
				style={{ display: "none" }}
				type="file"
				accept=".jpg,.jpeg,.png"
				onChange={pickedHandler}
			/>
			<div className={`${styles["image-upload"]} ${props.center && styles.center}`}>
				<div className={styles["image-upload__preview"]}>
					{previewUrl && <img src={previewUrl} alt="Preview" />}
					{!previewUrl && <p>Please pick an image</p>}
				</div>
			</div>
			<Button type="button" onClick={pickImageHandler}>
				Pick Image
			</Button>
			{!isValid && <p>{props.errorText}</p>}
		</div>
	);
};

export default ImageUpload;
