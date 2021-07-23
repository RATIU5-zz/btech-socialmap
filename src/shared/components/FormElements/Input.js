import React, { useReducer } from "react";

import { validate } from "../../util/validators";

import style from "./Input.module.css";

const inputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE":
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators),
			};
		case "TOUCH":
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

const Input = props => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: "",
		isValid: false,
		isTouched: false,
	});

	const inputChangeHandler = event => {
		dispatch({ type: "CHANGE", value: event.target.value, validators: props.validators });
	};

	const inputTouchHandler = () => {
		dispatch({ type: "TOUCH" });
	};

	const element =
		props.type && props.type !== "textarea" ? (
			<input
				id={props.id}
				type={props.type}
				value={inputState.value}
				onChange={inputChangeHandler}
				onBlur={inputTouchHandler}
				placeholder={props.placeholder}
			/>
		) : (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				value={inputState.value}
				onChange={inputChangeHandler}
				onBlur={inputTouchHandler}
				placeholder={props.placeholder}
			/>
		);

	return (
		<div
			className={`${style["form-control"]} ${
				!inputState.isValid && inputState.isTouched && style["form-control--invalid"]
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
			{!inputState.isValid && inputState.isTouched && (
				<p>{props.errorText || "Input is not valid"}</p>
			)}
		</div>
	);
};

export default Input;
