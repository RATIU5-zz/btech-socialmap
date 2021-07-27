const HTTPError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const User = require("../models/users");

let DUMMY_USERS = [
	{
		id: "u1",
		name: "John Doe",
		email: "test@test.com",
		password: "supersecretpassword",
	},
];

const getUsers = (req, res, next) => {
	res.status(200).json({
		users: DUMMY_USERS,
	});
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
		return next(new HTTPError(500, `Error creating user account; ${err}`));
	}

	if (existingUser) {
		return next(new HTTPError(422, "Cannot use an email that is already in use"));
	}

	const createdUser = new User({
		name,
		email,
		password,
		image: "https://images.unsplash.com/photo-1626639900810-cfebc6de0eae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
		places: 0,
	});

	try {
		await createdUser.save();
	} catch (err) {
		return next(new HTTPError(500, `Error: Signing user up failed; ${err}`));
	}

	res.status(201).json({ user: createdUser.toObject({ getters: true }) }); // 201 is successfully created code
};

const logUserIn = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HTTPError(422, "Invalid inputs passed."));
	}

	const { email, password } = req.body;

	const user = DUMMY_USERS.find(u => u.email === email);

	if (!user || user.password !== password) {
		return next(new HTTPError(401, "Could not find a user for the provided credentials."));
	}

	res.status(200).json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signUserUp = signUserUp;
exports.logUserIn = logUserIn;
