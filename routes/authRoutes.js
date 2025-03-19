const express = require('express');
const { signup, login } = require('../controllers/authController');
const { forgotPassword, resetPassword } = require("../controllers/passwordController");

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;