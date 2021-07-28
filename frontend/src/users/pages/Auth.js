import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
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
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

	const submitHandler = async event => {
		event.preventDefault();
		if (isLoginMode) {
			try {
				const data = await sendRequest("http://localhost:5000/api/users/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});
				authCtx.login(data.user.id);
			} catch (err) {}
		} else {
			try {
				const data = await sendRequest("http://localhost:5000/api/users/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});
				authCtx.login(data.user.id);
			} catch (err) {}
		}
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
		<>
			<ErrorModal error={error} onClear={clearError} />
			<Card className={`${style.authentication}`}>
				{isLoading && <LoadingSpinner asOverlay />}
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
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText="Please enter a valid password (6 characters minimum)"
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
		</>
	);
};

export default Auth;
