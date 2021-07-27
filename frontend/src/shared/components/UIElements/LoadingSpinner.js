import React from "react";

import style from "./LoadingSpinner.module.css";

const LoadingSpinner = props => {
	return (
		<div className={`${props.asOverlay && style["loading-spinner__overlay"]}`}>
			<div className={`${style["lds-dual-ring"]}`}></div>
		</div>
	);
};

export default LoadingSpinner;
