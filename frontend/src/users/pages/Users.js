import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import UsersList from "../components/UsersList";

const Users = () => {
	const [users, setUsers] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const data = await sendRequest("http://localhost:5000/api/users");
				setUsers(data.users);
			} catch (err) {}
		};
		getUsers();
	}, []);

	const errorHandler = () => {
		clearError(null);
	};

	return (
		<>
			<ErrorModal error={error} onClear={errorHandler} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && users && <UsersList items={users} />}
		</>
	);
};

export default Users;
