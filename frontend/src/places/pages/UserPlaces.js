import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import PlaceList from "../components/PlaceList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UserPlaces = props => {
	const [places, setPlaces] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const userId = useParams().userId;

	useEffect(() => {
		const getUserPlaces = async () => {
			try {
				const data = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
				setPlaces(data.places);
			} catch (err) {}
		};
		getUserPlaces();
	}, [sendRequest, userId]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div class="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && places && <PlaceList items={places} asOverlay />}
		</>
	);
};

export default UserPlaces;
