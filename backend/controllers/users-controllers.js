const HTTPError = require("../models/http-error");
const { validationResult } = require("express-validator");

const User = require("../models/user");

const getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find({}, "-password");
	} catch (err) {
		return next(new HTTPError(500, `Error: Retrieving users failed; ${err}`));
	}

	res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signUserUp = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HTTPError(422, "Invalid inputs passed."));
	}
	const { name, email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (err) {
		return next(new HTTPError(500, `Error: Signing user up failed; ${err}`));
	}

	if (existingUser) {
		return next(new HTTPError(422, "Cannot use an email that is already in use"));
	}

	const createdUser = new User({
		name,
		email,
		password,
		image: "https://images.unsplash.com/photo-1626639900810-cfebc6de0eae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
		places: [],
	});

	try {
		await createdUser.save();
	} catch (err) {
		return next(new HTTPError(500, `Error: Signing user up failed; ${err}`));
	}

	res.status(201).json({ user: createdUser.toObject({ getters: true }) }); // 201 is successfully created code
};

const logUserIn = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HTTPError(422, "Invalid inputs passed."));
	}
	const { email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (err) {
		return next(new HTTPError(500, `Error: Logging user in failed; ${err}`));
	}

	if (!existingUser || existingUser.password !== password) {
		return next(new HTTPError(401, "Failed to log user in"));
	}

	res.status(200).json({ message: "Logged in", user: existingUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.signUserUp = signUserUp;
exports.logUserIn = logUserIn;
