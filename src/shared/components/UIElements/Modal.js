import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

import style from "./Modal.module.css";

const ModalOverlay = props => {
	const content = (
		<div className={`${style.modal} ${props.className}`} style={props.style}>
			<header className={`${style.modal__header} ${props.headerClass}`}>
				<h2>{props.header}</h2>
			</header>
			<form onSubmit={props.onSubmit ? props.onSubmit : e => e.preventDefault()}>
				<div className={`${style.modal__content} ${props.contentClass}`}>
					{props.children}
				</div>
				<footer className={`${style.modal__footer} ${props.footerClass}`}>
					{props.footer}
				</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = props => {
	return (
		<>
			{props.show && <Backdrop onClick={props.onClose} />}
			<CSSTransition
				in={props.show}
				timeout={200}
				className={`${style.modal}`}
				classNames={{
					enter: style["modal-enter"],
					enterActive: style["modal-enter-active"],
					exit: style["modal-exit"],
					exitActive: style["modal-exit-active"],
				}}
				mountOnEnter
				unmountOnExit
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</>
	);
};

export default Modal;
