import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import style from "./PlaceForm.module.css";

const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		imageUrl:
			"https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
		address: "20, W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u1",
	},
	{
		id: "p2",
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		imageUrl:
			"https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
		address: "20, W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u2",
	},
];

const UpdatePlace = props => {
	const placeId = useParams().placeId;
	const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

	const [formState, inputHandler] = useForm(
		{
			title: {
				value: identifiedPlace.title,
				isValid: true,
			},
			description: {
				value: identifiedPlace.description,
				isValid: true,
			},
		},
		true
	);

	if (!identifiedPlace) {
		return (
			<div className={`center`}>
				<h2>Could not find place!</h2>
			</div>
		);
	}

	const submitHandler = event => {
		event.preventDefault();
	};

	return (
		<form className={`${style["place-form"]}`} onSubmit={submitHandler}>
			<Input
				id="title"
				type="text"
				label="Title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title"
				initialValue={formState.input.title.value}
				initialValid={formState.input.title.isValid}
				onInput={inputHandler}
			/>
			<Input
				id="description"
				type="text"
				label="Description"
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a description"
				initialValue={formState.input.description.value}
				initialValid={formState.input.description.isValid}
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				Update Place
			</Button>
		</form>
	);
};

export default UpdatePlace;
