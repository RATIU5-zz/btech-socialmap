import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";

import style from "./NavLinks.module.css";

const NavLinks = props => {
	const authCtx = useContext(AuthContext);

	return (
		<ul className={style["nav-links"]} onClick={props.onClick}>
			<li>
				<NavLink activeClassName={style.active} to="/" exact>
					ALL USERS
				</NavLink>
			</li>
			{authCtx.isLoggedIn && (
				<li>
					<NavLink activeClassName={style.active} to={`/${authCtx.userId}/places`}>
						MY PLACES
					</NavLink>
				</li>
			)}
			{authCtx.isLoggedIn && (
				<li>
					<NavLink activeClassName={style.active} to={"/places/new"}>
						ADD PLACE
					</NavLink>
				</li>
			)}
			{!authCtx.isLoggedIn && (
				<li>
					<NavLink activeClassName={style.active} to="/auth">
						AUTHENTICATE
					</NavLink>
				</li>
			)}
			{authCtx.isLoggedIn && (
				<li>
					<Button onClick={authCtx.logout} inverse>
						LOGOUT
					</Button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
