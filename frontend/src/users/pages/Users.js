import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
	const USERS_DUMMY = [
		{
			id: "u1",
			name: "Max",
			image: "https://images.unsplash.com/photo-1626639900810-cfebc6de0eae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
			places: 3,
		},
	];

	return <UsersList items={USERS_DUMMY} />;
};

export default Users;
