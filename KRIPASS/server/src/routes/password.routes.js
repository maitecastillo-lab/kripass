const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password.controller');

// Definimos los endpoints
router.get('/', passwordController.getPasswords);
router.post('/', passwordController.createPassword);

module.exports = router;