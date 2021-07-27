const { Router } = require("express");
const router = Router();
const placesControllers = require("../controllers/places-controllers");
const { check } = require("express-validator");

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.patch(
	"/:pid",
	[check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
	placesControllers.updatePlaceById
);

router.delete("/:pid", placesControllers.deletePlaceById);

router.post(
	"/",
	[
		check("title").not().isEmpty(),
		check("description").isLength({ min: 5 }),
		check("address").not().isEmpty(),
	],
	placesControllers.createPlace
);

module.exports = router;
