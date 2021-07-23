import React from "react";
import ReactDOM from "react-dom";

import style from "./Backdrop.module.css";

const Backdrop = props => {
	return ReactDOM.createPortal(
		<div className={style.backdrop} onClick={props.onClick}></div>,
		document.getElementById("backdrop-hook")
	);
};

export default Backdrop;
