import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import style from "./Auth.module.css";
const Auth = () => {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const authCtx = useContext(AuthContext);
	const history = useHistory();

	const [formState, inputHandler, setFormData] = useForm({
		email: {
			value: "",
			isValid: false,
		},
		password: {
			value: "",
			isValid: false,
		},
	});

	const submitHandler = event => {
		event.preventDefault();

		if (isLoginMode) {
			authCtx.login();
		}

		history.push("/");
	};

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData({
				...formState.inputs,
				name: {
					value: "",
					isValid: false,
				},
			});
		}

		setIsLoginMode(prevMode => !prevMode);
	};

	return (
		<Card className={`${style.authentication}`}>
			<h2>{isLoginMode ? "Login" : "Signup"} Required</h2>
			<hr />
			<form onSubmit={submitHandler}>
				{!isLoginMode && (
					<Input
						type="text"
						id="name"
						label="Your Name"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a name"
						onInput={inputHandler}
					/>
				)}
				<Input
					type="email"
					id="email"
					label="Email"
					validators={[VALIDATOR_EMAIL()]}
					errorText="Please enter a valid email address"
					onInput={inputHandler}
				/>
				<Input
					type="password"
					id="password"
					label="Password"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid password (5 characters minimum)"
					onInput={inputHandler}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					{isLoginMode ? "Login" : "Signup"}
				</Button>
			</form>
			<Button onClick={switchModeHandler} inverse>
				{isLoginMode ? "Signup instead" : "Login instead"}
			</Button>
		</Card>
	);
};

export default Auth;
