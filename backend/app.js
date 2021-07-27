const express = require("express");
const bP = require("body-parser");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HTTPError = require("./models/http-error");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
	throw new HTTPError(404, "Could not find requested route.");
});

app.use((error, req, res, next) => {
	if (res.headerSent) return next(error);
	res.status(error.code || 500);
	res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjqlc.mongodb.net/socialmap?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(5000);
	})
	.catch(err => {
		console.log(err);
	});
