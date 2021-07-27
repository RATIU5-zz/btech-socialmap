const HTTPError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { getCoordsForAddress } = require("../util/location");
const Place = require("../models/place");

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

const getPlaceById = async (req, res, next) => {
	const placeId = req.params.pid;

	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		return next(new HTTPError(500, `Error occured while searching for place; ${err}`));
	}

	if (!place) {
		return next(new HTTPError(404, "Could not find a place for the provided id."));
	}

	res.json({
		place: place.toObject({ getters: true }),
	});
};

const getPlacesByUserId = async (req, res, next) => {
	const userId = req.params.uid;
	let places;

	try {
		places = await Place.find({ creator: userId });
	} catch (err) {
		return next(new HTTPError(500, `Error occured while searching for places; ${err}`));
	}

	if (!places || places.length === 0) {
		return next(new HTTPError(404, "Could not find places for the provided user id."));
	}

	res.json({
		places: places.map(place => place.toObject({ getters: true })),
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

	const createdPlace = new Place({
		title,
		description,
		address,
		location: coords,
		image: "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
		creator,
	});

	try {
		await createdPlace.save();
	} catch (err) {
		return next(new HTTPError(500, `Error: Creating place failed; ${err}`));
	}

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
