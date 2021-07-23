import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import style from "./MainNavigation.module.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = props => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDraweHandler = () => {
		setDrawerIsOpen(true);
	};

	const closeDrawerHandler = () => {
		setDrawerIsOpen(false);
	};

	return (
		<>
			{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

			<SideDrawer show={drawerIsOpen}>
				<nav className={style["main-navigation__drawer-nav"]}>
					<NavLinks onClick={closeDrawerHandler} />
				</nav>
			</SideDrawer>

			<MainHeader>
				<button className={style["main-navigation__menu-btn"]} onClick={openDraweHandler}>
					<span />
					<span />
					<span />
				</button>
				<h1 className={style["main-navigation__title"]}>
					<Link to="/">socialmap</Link>
				</h1>
				<nav className={style["main-navigation__header-nav"]}>
					<NavLinks />
				</nav>
			</MainHeader>
		</>
	);
};

export default MainNavigation;
