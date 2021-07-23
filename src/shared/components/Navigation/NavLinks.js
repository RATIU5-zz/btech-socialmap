import React from "react";

import { NavLink } from "react-router-dom";

import style from "./NavLinks.module.css";

const NavLinks = props => {
	return (
		<ul className={style["nav-links"]} onClick={props.onClick}>
			<li>
				<NavLink activeClassName={style.active} to="/" exact>
					ALL USERS
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName={style.active} to="/u1/places">
					MY PLACES
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName={style.active} to="/places/new">
					ADD PLACE
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName={style.active} to="/auth">
					AUTHENTICATE
				</NavLink>
			</li>
		</ul>
	);
};

export default NavLinks;
