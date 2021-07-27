const HTTPError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { getCoordsForAddress } = require("../util/location");

let DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		location: {
			lat: 40.7484474,
			lng: -73.9871516,
		},
		address: "20 W 34th St, New York, NY 10001",
		creator: "u1",
	},
];

const getPlaceById = (req, res, next) => {
	const placeId = req.params.pid;
	const place = DUMMY_PLACES.find(p => p.id === placeId);

	if (!place) {
		return next(new HTTPError(404, "Could not find a place for the provided id."));
	}

	res.json({
		place,
	});
};

const getPlacesByUserId = (req, res, next) => {
	const userId = req.params.uid;
	const places = DUMMY_PLACES.filter(p => p.creator === userId);

	if (!places || places.length === 0) {
		return next(new HTTPError(404, "Could not find places for the provided user id."));
	}

	res.json({
		places,
	});
};

const createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HTTPError(422, "Invalid inputs passed."));
	}

	const { title, description, address, creator } = req.body;

	let coords;
	try {
		coords = await getCoordsForAddress(address);
	} catch (err) {
		return next(err);
	}

	const createdPlace = {
		id: uuidv4(),
		title,
		description,
		location: coords,
		address,
		creator,
	};

	DUMMY_PLACES.push(createdPlace);

	res.status(201).json({ place: createdPlace }); // 201 is successfully created code
};

const updatePlaceById = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HTTPError(422, "Invalid inputs passed.");
	}

	const { title, description } = req.body;
	const placeId = req.params.pid;
	const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
	if (!place) {
		return next(new HTTPError(404, "Could not find a place for the provided id."));
	}
	const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
	updatedPlace.title = title;
	updatedPlace.description = description;

	DUMMY_PLACES[placeIndex] = updatedPlace;

	res.status(200).json({ place: updatedPlace });
};

const deletePlaceById = (req, res, next) => {
	const placeId = req.params.pid;
	if (!DUMMY_PLACES.filter(p => p.id !== placeId)) {
		throw new HTTPError(404, "Could not find a place for provided ID");
	}
	DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
	res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
