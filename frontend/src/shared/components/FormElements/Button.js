import React from "react";
import { Link } from "react-router-dom";

import style from "./Button.module.css";

const Button = props => {
	if (props.href) {
		return (
			<a
				className={`${style.button} ${style[`button--${props.size || "default"}`]} ${
					props.inverse && style["button--inverse"]
				} ${props.danger && style["button--danger"]}`}
				href={props.href}
			>
				{props.children}
			</a>
		);
	}
	if (props.to) {
		return (
			<Link
				to={props.to}
				exact={props.exact}
				className={`${style.button} ${style[`button--${props.size || "default"}`]} ${
					props.inverse && style["button--inverse"]
				} ${props.danger && style["button--danger"]}`}
			>
				{props.children}
			</Link>
		);
	}
	return (
		<button
			className={`${style.button} ${style[`button--${props.size || "default"}`]} ${
				props.inverse && style["button--inverse"]
			} ${props.danger && style["button--danger"]}`}
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
