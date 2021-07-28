const { Router } = require("express");
const router = Router();
const placesControllers = require("../controllers/places-controllers");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.patch(
	"/:pid",
	[check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
	placesControllers.updatePlaceById
);

router.delete("/:pid", placesControllers.deletePlaceById);

router.post(
	"/",
	fileUpload.single("image"),
	[
		check("title").not().isEmpty(),
		check("description").isLength({ min: 5 }),
		check("address").not().isEmpty(),
	],
	placesControllers.createPlace
);

module.exports = router;
