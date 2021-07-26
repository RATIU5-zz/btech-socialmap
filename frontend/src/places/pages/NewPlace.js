import React from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";

import style from "./PlaceForm.module.css";
import { useForm } from "../../shared/hooks/form-hook";

const NewPlace = () => {
	const [formState, inputHandler] = useForm({
		title: {
			value: "",
			isValid: false,
		},
		description: {
			value: "",
			isValid: false,
		},
		address: {
			value: "",
			isValid: false,
		},
	});

	const submitHandler = event => {
		event.preventDefault();
	};

	return (
		<form className={`${style["place-form"]}`} onSubmit={submitHandler}>
			<Input
				id="title"
				type="text"
				label="Title"
				errorText="Please enter a valid title"
				validators={[VALIDATOR_REQUIRE()]}
				onInput={inputHandler}
			/>
			<Input
				id="address"
				type="text"
				label="Address"
				errorText="Please enter a valid address"
				validators={[VALIDATOR_REQUIRE()]}
				onInput={inputHandler}
			/>
			<Input
				id="description"
				label="Description"
				errorText="Please enter a description"
				validators={[VALIDATOR_MINLENGTH(5)]}
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				Add Place
			</Button>
		</form>
	);
};

export default NewPlace;
