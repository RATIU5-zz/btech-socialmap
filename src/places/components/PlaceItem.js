import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import style from "./PlaceItem.module.css";

const PlaceItem = props => {
	const [showMap, setShowMap] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);

	const openDeleteModalHandler = () => setShowDeleteModal(true);
	const closeDeleteModalHandler = () => setShowDeleteModal(false);

	const deletePlaceHandler = () => {
		closeDeleteModalHandler();
	};

	return (
		<>
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
					<div className={`${style["place-item__image"]}`}>
						<img src={props.image} alt={props.title} />
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
						<Button to={`/places/${props.id}`}>EDIT</Button>
						<Button onClick={openDeleteModalHandler} danger>
							DELETE
						</Button>
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
