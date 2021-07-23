import React, { useState } from "react";

import style from "./Input.module.css";

const Input = props => {
	const [inputValue, setInputValue] = useState(null);

	const element = props.type ? (
		<input id={props.id} type={props.type} value={inputValue} placeholder={props.placeholder} />
	) : (
		<textarea
			id={props.id}
			rows={props.rows || 3}
			value={inputValue}
			placeholder={props.placeholder}
		/>
	);

	return (
		<div className={`${style["form-control"]}`}>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
		</div>
	);
};

export default Input;
