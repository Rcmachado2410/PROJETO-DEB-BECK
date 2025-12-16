const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");

// cadastro
router.post("/register", AuthController.register);

// login
router.post("/login", AuthController.login);

module.exports = router;
