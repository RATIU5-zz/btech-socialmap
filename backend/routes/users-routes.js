const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post("/signup", usersControllers.signUserUp);

router.post("/login", usersControllers.logUserIn);

module.exports = router;
