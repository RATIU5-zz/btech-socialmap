import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(undefined);
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

	const submitHandler = async event => {
		event.preventDefault();

		setIsLoading(true);
		let res;
		if (isLoginMode) {
			try {
				setError(null);
				res = await fetch("http://localhost:5000/api/users/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});

				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}

				setIsLoading(false);

				authCtx.login();
			} catch (err) {
				setIsLoading(false);
				setError(err.message || "Something went wrong...");
			}
		} else {
			try {
				setError(null);
				res = await fetch("http://localhost:5000/api/users/signup", {
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

				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}

				setIsLoading(false);

				authCtx.login();
			} catch (err) {
				setIsLoading(false);
				setError(err.message || "Something went wrong...");
			}
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

	const errorHandler = () => {
		setError(null);
	};

	return (
		<>
			<ErrorModal error={error} onClear={errorHandler} />
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
		</>
	);
};

export default Auth;
