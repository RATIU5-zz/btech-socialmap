import React from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import style from "./NewPlace.module.css";

const NewPlace = () => {
	const submitHandler = event => {
		event.preventDefault();
	};

	return (
		<form className={`${style["place-form"]}`} onSubmit={submitHandler}>
			<Input
				type="text"
				label="Title"
				errorText="Please enter a valid title"
				validators={[VALIDATOR_REQUIRE()]}
			/>
		</form>
	);
};

export default NewPlace;
