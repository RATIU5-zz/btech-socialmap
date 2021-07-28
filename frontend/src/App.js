import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import Users from "./users/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
	const { token, userId, login, logout } = useAuth();

	let routes;
	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/places/new" exact>
					<NewPlace />
				</Route>
				<Route path="/places/:placeId" exact>
					<UpdatePlace />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/auth">
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token,
				userId,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<MainNavigation />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
