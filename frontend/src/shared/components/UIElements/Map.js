import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import styles from "./Map.module.css";

const Map = props => {
	return (
		<MapContainer
			className={`${styles.map} ${props.className}`}
			style={props.style}
			center={props.center}
			zoom={props.zoom}
			scrollWheelZoom={props.scrollWheelZoom ?? true}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
			/>
			<Marker position={props.center}>{props.popup && <Popup>{props.popup}</Popup>}</Marker>
		</MapContainer>
	);
};

export default Map;
