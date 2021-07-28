import React, { useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";

import style from "./PlaceForm.module.css";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";

const NewPlace = () => {
	const history = useHistory();
	const authCtx = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

	const submitHandler = async event => {
		event.preventDefault();
		try {
			await sendRequest("http://localhost:5000/api/places", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
					address: formState.inputs.address.value,
					creator: authCtx.userId,
					title: formState.inputs.title.value,
				}),
			});
			history.push("/");
		} catch (err) {}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
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
		</>
	);
};

export default NewPlace;
