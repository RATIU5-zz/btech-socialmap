const express = require("express");
const bP = require("body-parser");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HTTPError = require("./models/http-error");
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

app.listen(5000);
