const express = require( "express");
const  upload = require( "../middlewares/multerConfig.js");
const { register, login } = require( "../controllers/auth.controller.js");
const {getUser} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", upload.single("image"), register);

router.post("/login", login);

router.get("/", getUser);

module.exports = router;