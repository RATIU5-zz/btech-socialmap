import React, { useContext, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import style from "./PlaceItem.module.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = props => {
	const [showMap, setShowMap] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const authCtx = useContext(AuthContext);

	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);

	const openDeleteModalHandler = () => setShowDeleteModal(true);
	const closeDeleteModalHandler = () => setShowDeleteModal(false);

	const deletePlaceHandler = async () => {
		closeDeleteModalHandler();
		try {
			await sendRequest(`http://localhost:5000/api/places/${props.id}`, {
				method: "DELETE",
			});
			props.onDeletePlace(props.id);
		} catch (err) {}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<Modal
				show={showMap}
				onClose={closeMapHandler}
				header={props.address}
				contentClass={`${style["place-item__modal-content"]}`}
				footerClass={`${style["place-item__modal-actions"]}`}
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			>
				<div className={`${style["map-container"]}`}>
					<Map center={props.coordinates} zoom={16} />
				</div>
			</Modal>

			<Modal
				show={showDeleteModal}
				onClose={closeDeleteModalHandler}
				header="Confirm Delete"
				contentClass={`${style["place-item__modal-content"]}`}
				footerClass={`${style["place-item__modal-actions"]}`}
				footer={
					<>
						<Button onClick={closeDeleteModalHandler} inverse>
							Cancel
						</Button>
						<Button onClick={deletePlaceHandler} danger>
							Delete
						</Button>
					</>
				}
			>
				<p className={`center`}>
					Are you sure you want to delete this place? This action cannot be undone!
				</p>
			</Modal>

			<li className={`${style["place-item"]}`}>
				<Card className={`${style["place-item__content"]}`}>
					{isLoading && <LoadingSpinner asOverlay />}
					{!isLoading && (
						<>
							<div className={`${style["place-item__image"]}`}>
								<img
									src={`http://localhost:5000/${props.image}`}
									alt={props.title}
								/>
							</div>
							<div className={`${style["place-item__info"]}`}>
								<h2>{props.title}</h2>
								<h3>{props.address}</h3>
								<p>{props.description}</p>
							</div>
							<div className={`${style["place-item__actions"]}`}>
								<Button onClick={openMapHandler} inverse>
									VIEW ON MAP
								</Button>
								{console.log(authCtx.userId, props.creatorId)}
								{authCtx.userId === props.creatorId && (
									<Button to={`/places/${props.id}`}>EDIT</Button>
								)}
								{authCtx.userId === props.creatorId && (
									<Button onClick={openDeleteModalHandler} danger>
										DELETE
									</Button>
								)}
							</div>
						</>
					)}
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
