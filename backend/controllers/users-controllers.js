const HTTPError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

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

const signUserUp = (req, res, next) => {
	const { name, email, password } = req.body;

	const hasUser = DUMMY_USERS.find(u => u.email === email);

	if (hasUser) {
		throw new HTTPError(422, "Could not create user with already existing email"); // 422 Invalid user inpur
	}

	const createdUser = {
		id: uuidv4(),
		name,
		email,
		password,
	};

	DUMMY_USERS.push(createdUser);

	res.status(201).json({ user: createdUser }); // 201 is successfully created code
};

const logUserIn = (req, res, next) => {
	const { email, password } = req.body;

	const user = DUMMY_USERS.find(u => u.email === email);

	if (!user || user.password !== password) {
		throw new HTTPError(401, "Could not find a user for the provided credentials.");
	}

	res.status(200).json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signUserUp = signUserUp;
exports.logUserIn = logUserIn;
