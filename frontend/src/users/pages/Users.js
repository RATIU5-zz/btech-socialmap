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
				const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
				setUsers(data.users);
			} catch (err) {}
		};
		getUsers();
	}, [sendRequest]);
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
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
