import React from "react";
import Input from "../../shared/components/FormElements/Input";

import style from "./NewPlace.module.css";

const NewPlace = () => {
	return (
		<form className={`${style["place-form"]}`}>
			<Input type="text" label="Title" />
		</form>
	);
};

export default NewPlace;
