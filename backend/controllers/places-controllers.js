const HTTPError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { getCoordsForAddress } = require("../util/location");
const mongoose = require("mongoose");
const Place = require("../models/place");
const User = require("../models/user");

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
		return next(new HTTPError(500, `Error: Searching for place failed; ${err}`));
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

	let user;
	try {
		user = await User.findById(creator);
	} catch (err) {
		return next(new HTTPError(404, "Could not find user for provided id"));
	}

	if (!user) {
		return next(new HTTPError(500, `Error: Creating place failed; ${err}`));
	}

	try {
		// Use a session so if something fails, all changes will roll back without updating the database
		const session = await mongoose.startSession();
		session.startTransaction();
		await createdPlace.save({ session });
		user.places.push(createdPlace);
		await user.save({ session });
		await session.commitTransaction();
	} catch (err) {
		return next(new HTTPError(500, `Error: Creating place failed; ${err}`));
	}

	res.status(201).json({ place: createdPlace }); // 201 is successfully created code
};

const updatePlaceById = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HTTPError(422, "Invalid inputs passed."));
	}
	const { title, description } = req.body;
	console.log(req.params.pid);
	const placeId = req.params.pid;

	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		return next(new HTTPError(500, `Error: Searching for place failed; ${err}`));
	}

	if (!place) {
		return next(new HTTPError(404, "Could not find a place for the provided id."));
	}

	place.title = title;
	place.description = description;

	try {
		await place.save();
	} catch (err) {
		return next(new HTTPError(500, `Error: Updating place failed: ${err}`));
	}

	res.status(200).json({ place });
};

const deletePlaceById = async (req, res, next) => {
	const placeId = req.params.pid;

	let place;

	try {
		place = await Place.findById(placeId);
	} catch (err) {
		return next(new HTTPError(500, `Error: Searching for place failed; ${err}`));
	}

	if (!place) {
		return next(new HTTPError(404, "Could not find a place for the provided id."));
	}

	try {
		await place.remove();
	} catch (err) {
		return next(new HTTPError(500, `Error: Deleting place failed; ${err}`));
	}

	res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
