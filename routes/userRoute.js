const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const tokenHandler = require("../middlware/tokenHandler");
const router = express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/current",tokenHandler, currentUser)
 

module.exports = router;