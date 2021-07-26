import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import style from "./UserItem.module.css";

const UserItem = props => {
	return (
		<li className={style["user-item"]}>
			<Card className={style["user-item__content"]}>
				<Link to={`/${props.id}/places`}>
					<div className={style["user-item__image"]}>
						<Avatar image={props.image} alt={props.name} />
					</div>
					<div className={style["user-item__info"]}>
						<h2>{props.name}</h2>
						<h3>
							{props.placeCount} {props.placeCount === 1 ? "place" : "places"}
						</h3>
					</div>
				</Link>
			</Card>
		</li>
	);
};

export default UserItem;
