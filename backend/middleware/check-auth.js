const jwt = require("jsonwebtoken");
const HTTPError = require("../models/http-error");
require("dotenv").config();

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") return next();
	try {
		const token = req.headers.authorization.split(" ")[1]; // Authorization: "Bearer TOKEN"
		if (!token) throw new Error("Invalid token!");

		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		return next(new HTTPError(401, `Authorization failed!`));
	}
};
